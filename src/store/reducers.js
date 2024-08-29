import { combineReducers } from '@reduxjs/toolkit';
import apiSlice from './api.slice';
import authReducer from './auth.slice';
import merchantReducer from './merchant.slice';

const reducers = combineReducers({
  auth: authReducer,
  merchant: merchantReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

export default reducers;
