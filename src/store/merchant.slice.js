import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { authError } from './auth.slice';

const initialState = {
  business: null,
  err: false,
  errMsg: ''
};

export const fetchBusiness = createAsyncThunk('business/fetchBusiness', async ({ userId }, { dispatch }) => {
  try {
    const accessStorage = localStorage.getItem('access');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(accessStorage).access_token}`,
      'X-XSRF-TOKEN': JSON.parse(localStorage.getItem('access')).csrf
    };
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URI}/api/v1/merchant/all?createdBy=${userId}`, { headers });

    return response.data.merchants;
  } catch (error) {
    if (error.status === 401) {
      dispatch(authError({ err: true, status: error.status, errMsg: 'Unauthorized access' }));
    }
    return error;
  }
});

export const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    setBusiness: (state, action) => ({
      ...state,
      business: action.payload,
      err: false,
      errMsg: ''
    })
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchBusiness.fulfilled, (state, action) => {
      state.business = action.payload;
    });
  }
});

export const { setBusiness } = merchantSlice.actions;

export default merchantSlice.reducer;
