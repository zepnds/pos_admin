import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Business } from '../types/merchant';

type InitialState = {
  business: Array<Business>;
  addBusiness: Record<string, string>;
};

interface Response {
  merchants: Array<Business>;
}

interface ResponseErr {
  errorMessage: string;
}

interface GetMerchant {
  id: number;
  token: string;
}

export const getBusiness = createAsyncThunk<
  Response,
  GetMerchant,
  { rejectValue: ResponseErr }
>('merchant/getBusiness', async (data, { rejectWithValue }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URI}/api/v1/merchant/all?createdBy=${
      data.id
    }`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    return rejectWithValue(errorData as ResponseErr);
  }

  const result = await response.json();
  return result as Response;
});

const initialState: InitialState = {
  business: [],
  addBusiness: {},
};

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    setBusiness: (state, action) => ({
      ...state,
      ...[action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getBusiness.fulfilled, (state, { payload }) => {
      state.business = payload.merchants;
      return state;
    });
  },
});

export const { setBusiness } = merchantSlice.actions;
export default merchantSlice.reducer;
