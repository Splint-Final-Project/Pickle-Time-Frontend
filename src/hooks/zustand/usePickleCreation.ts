import { create } from 'zustand';

type Pickle = {
  title: string;
  capacity: number;
  cost: number;
  deadLine: Date;
  where: string;
  when: {
    summary: string;
    times: Date[];
  };
  category: string;
  explanation: string;
  viewCount: number; // 초기 viewCount 설정
  latitude: number;
  longitude: number;
  goals: string[],
  imgUrl: string;
  setTitle: (title: string) => void;
  setCapacity: (capacity: number) => void;
  setCost: (cost: number) => void;
  setDeadLine: (deadLine: Date) => void;
  setWhere: (where: string) => void;
  setWhen: (when: { summary: string; times: Date[] }) => void;
  setCategory: (category: string) => void;
  setExplanation: (explanation: string) => void;
  setViewCount: (viewCount: number) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setAddGoals: (newGoals: string) => void;
  setRemoveGoals: (goals: string[]) => void;
  setImgUrl: (imgUrl: string) => void;
  clear: () => void;
};

const usePickleCreation = create<Pickle>(set => ({
  title: '',
  capacity: 0,
  cost: 0,
  deadLine: new Date(),
  where: '',
  when: {
    summary: '',
    times: [],
  },
  category: '',
  explanation: '',
  viewCount: 0,
  latitude: 0,
  longitude: 0,
  goals: [],
  imgUrl: '',
  setTitle: (title: string) => set({ title }),
  setCapacity: (capacity: number) => set({ capacity }),
  setCost: (cost: number | undefined) => set({ cost }),
  setDeadLine: (deadLine: Date) => set({ deadLine }),
  setWhere: (where: string) => set({ where }),
  setWhen: (when: { summary: string; times: Date[] }) => set({ when }),
  setCategory: (category: string) => set({ category }),
  setExplanation: (explanation: string) => set({ explanation }),
  setViewCount: (viewCount: number) => set({ viewCount }),
  setLatitude: (latitude: number) => set({ latitude }),
  setLongitude: (longitude: number) => set({ longitude }),
  setAddGoals: (newGoals: string) => set(state => ({ goals: [...state.goals, newGoals] })),
  setRemoveGoals: (goals: string[]) => set({goals}),
  setImgUrl: (imgUrl: string) => set({ imgUrl }),
  clear: () => set({}),
}));

export default usePickleCreation;
