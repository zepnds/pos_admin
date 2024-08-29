import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BACKEND_URI}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.access_token;
      console.log('token', token);
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }),
  tagTypes: ['PosSystems'],
  endpoints: () => ({})
});

export default apiSlice;
