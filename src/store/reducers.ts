import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import merchatSlice from './merchatSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  merchant: merchatSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
