import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  step: number;
}
const initialState: InitialState = {
  step: 1,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
      return state;
    },
  },
});

export const { setStep } = appSlice.actions;
export default appSlice.reducer;
