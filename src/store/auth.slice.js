import { createSlice } from '@reduxjs/toolkit';
import apiSlice from './api.slice';

const initialState = {
  user: {
    access_token: null,
    refresh_token: null,
    csrf: null,
    role: null,
    id: null
  },
  err: false,
  errMsg: '',
  status: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action) => ({
      ...state,
      err: false,
      errMsg: '',
      user: action.payload,
      status: null
    }),
    authError: (state, action) => {
      const { err, errMsg, status } = action.payload;
      state.err = err;
      state.errMsg = errMsg;
      state.status = status;
      state.user = {
        access_token: null,
        refresh_token: null,
        email: null,
        csrf: null,
        role: null,
        id: null
      };
      return state;
    }
  }
});

export const { updateAuth, authError } = authSlice.actions;

export default authSlice.reducer;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    PostLoginUser: builder.mutation({
      query: (args) => ({
        url: 'api/v1/auth/authenticate',
        method: 'POST',
        body: args
      })
    })
  })
});

export const { usePostLoginUserMutation } = userApiSlice;
