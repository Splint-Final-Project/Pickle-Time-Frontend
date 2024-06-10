import { ComponentType } from 'react';
import { create } from 'zustand';

interface ModalState {
  active: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  component: ComponentType<any> | null;
  setComponent: (component: ComponentType<any> | null) => void;
}

const useBottomSheetModalState = create<ModalState>()(set => ({
  active: false,
  handleOpen: () => set(() => ({ active: true })),
  handleClose: () => set(() => ({ active: false })),
  component: null,
  setComponent: component => set(() => ({ component })),
}));

export default useBottomSheetModalState;
