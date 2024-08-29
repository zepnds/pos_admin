import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './api.slice';
import reducers from './reducers';
import errorHandlerMiddleware from '../hooks/useError';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   //* Ignore these action types
      //   ignoredActions: ['app/openModal', 'app/openDrawer'],
      //   //* Ignore these field paths in all actions
      //   // ? ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      //   //* Ignore these paths in the state
      //   ignoredPaths: ['app.modal', 'app.drawer'],
      // },
    }).concat(apiSlice.middleware, errorHandlerMiddleware),
  devTools: true
});

export default store;
