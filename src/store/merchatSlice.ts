import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Business } from '../types/merchant';

type InitialState = {
  business: Array<Business>;
  addBusiness: Record<string, string>;
  createActions: Record<string, string | boolean | undefined>;
};

interface Response {
  merchants: Array<Business>;
  message: string;
}

interface ResponseErr {
  message: string | undefined;
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

export const createBusiness = createAsyncThunk<
  Response,
  GetMerchant,
  { rejectValue: ResponseErr }
>('merchant/createBusiness', async (data, { rejectWithValue }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URI}/api/v1/merchant/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data),
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
  addBusiness: {
    title: '',
    address: '',
    category: '',
  },
  createActions: {
    status: '',
    message: '',
  },
};

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    setBusiness: (state, action) => ({
      ...state,
      addBusiness: { ...state.addBusiness, ...action.payload },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBusiness.fulfilled, (state, { payload }) => {
        state.business = payload.merchants;
        return state;
      })
      .addCase(createBusiness.fulfilled, (state, { payload }) => {
        state.business = payload.merchants;
        state.createActions.status = 'success';
        state.createActions.message = payload.message;
        return state;
      })
      .addCase(createBusiness.pending, (state) => {
        state.createActions.status = 'pending';
        return state;
      })
      .addCase(createBusiness.rejected, (state, { payload }) => {
        state.createActions.status = 'error';
        console.log('payload', payload);
        state.createActions.message = payload?.message;
        return state;
      });
  },
});

export const { setBusiness } = merchantSlice.actions;
export default merchantSlice.reducer;
