import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import merchatSlice from './merchatSlice';
import appslice from './appslice';

const rootReducer = combineReducers({
  auth: authSlice,
  merchant: merchatSlice,
  app: appslice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
