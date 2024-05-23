import { create } from "zustand";

const useButtonClick = create<{
  count: number;
  inc: () => void;
}>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export default useButtonClick;
