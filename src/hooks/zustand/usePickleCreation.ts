import { create } from 'zustand';

const usePickleCreation = create<{
  title: string;
  capacity: number;
  cost: number;
  deadLine: Date;
  place: string;
  address: string;
  detailedAddress: string;
  areaCode: number;
  latitude: number;
  longitude: number;
  when: {
    summary: string;
    times: Date[];
  };
  category: string;
  explanation: string;
  viewCount: number; // 초기 viewCount 
  goals: string[];
  imgUrl: string;
  setTitle: (title: string) => void;
  setCapacity: (capacity: number) => void;
  setCost: (cost: number) => void;
  setDeadLine: (deadLine: Date) => void;
  setPlace: (place: string) => void;
  setAddress: (address: string) => void;
  setDetailedAddress: (detailedAddress: string) => void;
  setAreaCode: (areaCode: number) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setWhen: (when: { summary: string; times: Date[] }) => void;
  setCategory: (category: string) => void;
  setExplanation: (explanation: string) => void;
  setViewCount: (viewCount: number) => void;
  setGoals: (goals: string[]) => void;
  setImgUrl: (imgUrl: string) => void;
  clear: () => void;
}>(set => ({
  title: '',
  capacity: 0,
  cost: 0,
  deadLine: new Date(),
  place: '',
  address: '',

  detailedAddress: '',
  areaCode: 0,
  latitude: 0,
  longitude: 0,
  when: {
    summary: '',
    times: [],
  },
  category: '',
  explanation: '',
  viewCount: 0,
  goals: [],
  imgUrl: '',
  setTitle: (title: string) => set({ title }),
  setCapacity: (capacity: number) => set({ capacity }),
  setCost: (cost: number | undefined) => set({ cost }),
  setDeadLine: (deadLine: Date) => set({ deadLine }),
  setPlace: (place: string) => set({ place }),
  setAddress: (address: string) => set({ address }),
  setDetailedAddress: (detailedAddress: string) => set({ detailedAddress }),
  setAreaCode: (areaCode: number) => set({ areaCode }),
  setLatitude: (latitude: number) => set({ latitude }),
  setLongitude: (longitude: number) => set({ longitude }),
  setWhen: (when: { summary: string; times: Date[] }) => set({ when }),
  setCategory: (category: string) => set({ category }),
  setExplanation: (explanation: string) => set({ explanation }),
  setViewCount: (viewCount: number) => set({ viewCount }),
  setGoals: (goals: string[]) => set({ goals }),
  setImgUrl: (imgUrl: string) => set({ imgUrl }),
  clear: () => set({}),
}));

export default usePickleCreation;
