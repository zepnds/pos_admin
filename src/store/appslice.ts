import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  step: number;
  openDialog: boolean;
  dialogTitle: string;
  dialogDesc: string;
}
const initialState: InitialState = {
  step: 1,
  openDialog: false,
  dialogTitle: '',
  dialogDesc: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
      return state;
    },
    setOpenDialog: (state, action) => {
      state.openDialog = action.payload.status;
      state.dialogTitle = action.payload.title;
      state.dialogDesc = action.payload.dialogDesc;
      return state;
    },
  },
});

export const { setStep, setOpenDialog } = appSlice.actions;
export default appSlice.reducer;
