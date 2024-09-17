import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Business, CBusiness, IBranch, UBusiness } from '../types/merchant';
import { setOpenDialog } from './appslice';

type InitialState = {
  business: Array<Business>;
  addBusiness: Record<string, string>;
  createActions: Record<string, string | boolean | undefined>;
  selectedId: number;
  update: false;
  addBranch: Record<string, string>;
  branches: Array<IBranch>;
};

interface Response {
  merchants: Array<Business>;
  message: string;
}

interface ResponseErr {
  message: string | undefined;
}

interface Merchant {
  id: number;
  token: string;
}

export const getBusiness = createAsyncThunk<
  Response,
  Merchant,
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
  CBusiness,
  { rejectValue: ResponseErr }
>('merchant/createBusiness', async (data, { rejectWithValue, dispatch }) => {
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
  dispatch(setBusiness({ title: '', address: '', category: '', email: '' }));
  return result as Response;
});

export const deleteBusiness = createAsyncThunk<
  Response,
  Merchant,
  { rejectValue: ResponseErr }
>('merchant/deleteBusiness', async (data, { rejectWithValue, dispatch }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URI}/api/v1/merchant/delete?id=${data.id}`,
    {
      method: 'DELETE',
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
  dispatch(setOpenDialog({ status: false, title: '', dialogDesc: '' }));
  return result as Response;
});

export const updateBusiness = createAsyncThunk<
  Response,
  UBusiness,
  { rejectValue: ResponseErr }
>('merchant/updateBusiness', async (data, { rejectWithValue, dispatch }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URI}/api/v1/merchant/update?id=${data.id}`,
    {
      method: 'PUT',
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
  dispatch(setBusiness({ title: '', address: '', category: '', email: '' }));
  dispatch(updateForm(false));

  return result as Response;
});

type BRequest = {
  token: string;
  id: number;
};

interface GetBranchResponse {
  branches: Array<IBranch>;
  message: string;
  status: string;
}

export const getBranch = createAsyncThunk<
  GetBranchResponse,
  BRequest,
  { rejectValue: ResponseErr }
>('merchant/getBranch', async (data, { rejectWithValue }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URI}/api/v1/branch/all?id=${data.id}`,
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
  return result as GetBranchResponse;
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
  update: false,
  selectedId: 0,
  addBranch: {
    company_code: '',
    branch_address: '',
    branch_email: '',
    branch_name: '',
  },
  branches: [],
};

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    setBusiness: (state, action) => ({
      ...state,
      addBusiness: { ...state.addBusiness, ...action.payload },
    }),
    setBranch: (state, action) => ({
      ...state,
      addBranch: { ...state.addBranch, ...action.payload },
    }),
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
      return state;
    },
    updateForm: (state, action) => {
      state.update = action.payload;
      return state;
    },
    resetMessage: (state) => {
      state.createActions.status = '';
      state.createActions.message = '';
      return state;
    },
    resetBusiness: (state, action) => {
      state.business = action.payload;
      return state;
    },
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
        state.createActions.message = payload?.message;
        return state;
      })
      .addCase(updateBusiness.fulfilled, (state, { payload }) => {
        state.business = payload.merchants;
        state.createActions.status = 'success';
        state.createActions.message = payload.message;
        return state;
      })
      .addCase(updateBusiness.pending, (state) => {
        state.createActions.status = 'pending';
        return state;
      })
      .addCase(updateBusiness.rejected, (state, { payload }) => {
        state.createActions.status = 'error';
        state.createActions.message = payload?.message;
        return state;
      })
      .addCase(deleteBusiness.fulfilled, (state, { payload }) => {
        state.createActions.status = 'success';
        state.createActions.message = payload.message;
        return state;
      })
      .addCase(deleteBusiness.pending, (state) => {
        state.createActions.status = 'pending';
        return state;
      })
      .addCase(deleteBusiness.rejected, (state, { payload }) => {
        state.createActions.status = 'error';
        state.createActions.message = payload?.message;
        return state;
      })
      .addCase(getBranch.fulfilled, (state, { payload }) => {
        state.createActions.status = 'success';
        state.createActions.message = payload.message;
        state.branches = payload.branches;
        console.log('payload', payload);
        return state;
      });
  },
});

export const {
  setBusiness,
  setSelectedId,
  updateForm,
  resetMessage,
  resetBusiness,
  setBranch,
} = merchantSlice.actions;
export default merchantSlice.reducer;
