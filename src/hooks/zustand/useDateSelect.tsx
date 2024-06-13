import { create } from 'zustand';

export interface DayOfWeekInterface {
  day: string;
  id: number;
  isClicked: boolean;
}

export type DateTypeInInterface = {
  year: number;
  month: number;
  day: number;
};

export type TimeTypeInInterface = {
  hour: number;
  minute: number;
  dayTime: string;
};

export interface DateInterface {
  startDate: DateTypeInInterface;
  finishDate: DateTypeInInterface;
  weekend: DayOfWeekInterface[];
  startTime: TimeTypeInInterface;
  finishTime: TimeTypeInInterface;
  setStartDate: (newStartDate: DateTypeInInterface) => void;
  setFinishDate: (newFinishDate: DateTypeInInterface) => void;
  setWeekend: (newWeekend: DayOfWeekInterface[]) => void;
  setStartTime: (newStartTime: TimeTypeInInterface) => void;
  setFinishTime: (newFinishTime: TimeTypeInInterface) => void;
}

const DAY_OF_WEEK = [
  { day: '일', id: 0, isClicked: false },
  { day: '월', id: 1, isClicked: false },
  { day: '화', id: 2, isClicked: false },
  { day: '수', id: 3, isClicked: false },
  { day: '목', id: 4, isClicked: false },
  { day: '금', id: 5, isClicked: false },
  { day: '토', id: 6, isClicked: false },
];

export const useDateSelect = create<DateInterface>(set => ({
  startDate: { year: 2024, month: 1, day: 1 },
  finishDate: { year: 2024, month: 1, day: 1 },
  weekend: DAY_OF_WEEK,
  startTime: { hour: 9, minute: 0, dayTime: 'AM' },
  finishTime: { hour: 10, minute: 0, dayTime: 'AM' },
  setStartDate: (newStartDate: { year: number; month: number; day: number }) =>
    set(state => ({ ...state, startDate: newStartDate })),
  setFinishDate: (newFinishDate: { year: number; month: number; day: number }) =>
    set(state => ({ ...state, finishDate: newFinishDate })),
  setWeekend: (newWeekend: DayOfWeekInterface[]) => set(state => ({ ...state, weekend: newWeekend })),
  setStartTime: (newStartTime: { hour: number; minute: number; dayTime: string }) =>
    set(state => ({ ...state, startTime: newStartTime })),
  setFinishTime: (newFinishTime: { hour: number; minute: number; dayTime: string }) =>
    set(state => ({ ...state, finishTime: newFinishTime })),
}));
