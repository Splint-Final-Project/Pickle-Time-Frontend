import { create } from 'zustand';

export type DateTypeInInterface = {
  year: number;
  month: number;
  day: number;
};

export type TimeTypeInInterface = {
  hour: number;
  minute: number;
};

const usePickleEdit = create<{
  step: 1 | 2;
  title: string;
  category: string;
  explanation: string;
  viewCount: number; // 초기 viewCount
  goals: string[];
  imgUrl: string;
  isImgLoading: boolean;

  setStep: (step: 1 | 2) => void;
  setTitle: (title: string) => void;
  setCategory: (category: string) => void;
  setExplanation: (explanation: string) => void;
  setViewCount: (viewCount: number) => void;
  setGoals: (goals: string[]) => void;
  setImgUrl: (imgUrl: string) => void;
  setIsImgLoading: (isImgLoading: boolean) => void;
  clear: () => void;
}>(set => ({
  step: 1,
  title: '',
  cost: 0,
  category: '',
  explanation: '',
  viewCount: 0,
  goals: [],
  imgUrl: '',
  isImgLoading: false,
  setStep: (step: 1 | 2) => set({ step }),
  setTitle: (title: string) => set({ title }),
  setCategory: (category: string) => set({ category }),
  setExplanation: (explanation: string) => set({ explanation }),
  setViewCount: (viewCount: number) => set({ viewCount }),
  setGoals: (goals: string[]) => set({ goals }),
  setImgUrl: (imgUrl: string) => set({ imgUrl }),
  clear: () =>
    set({
      step: 1,
      title: '',
      category: '',
      explanation: '',
      viewCount: 0,
      goals: [],
      imgUrl: '',
      isImgLoading: false,
    }),
  setIsImgLoading: (isImgLoading: boolean) => set({ isImgLoading }),
}));

export default usePickleEdit;
