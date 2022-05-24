import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalState = {
  type: string;
  component: any
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    openedModal: [] as ModalState[]
  },
  reducers: {
    open(state, action: PayloadAction<ModalState>) {
      const modalConfig = action.payload;
      const { type } = modalConfig;

      !state.openedModal.find((modal) => modal.type === type) && 
      state.openedModal.push(modalConfig);
    }
  }
})

export const { open } = modalSlice.actions;
export default modalSlice.reducer;
