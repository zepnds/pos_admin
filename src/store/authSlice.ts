import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  access_token: string;
  id: number;
  email: string;
  refresh_token: string;
  authenticated: boolean;
};

interface Response {
  message: string;
  status: string;
  refresh_token: string;
  access_token: string;
  email: string;
  id: number;
}

interface ResponseErr {
  errorMessage: string;
}

interface IFormInput {
  email: string;
  password: string;
}

export const authLogin = createAsyncThunk<
  Response,
  IFormInput,
  { rejectValue: ResponseErr }
>('auth/login', async (data, { rejectWithValue }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URI}/api/v1/auth/authenticate`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
  access_token: '',
  id: 0,
  email: '',
  refresh_token: '',
  authenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authLogin.fulfilled, (state, { payload }) => {
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;
      state.email = payload.email;
      state.id = payload.id;
      state.authenticated = true;
      return state;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
