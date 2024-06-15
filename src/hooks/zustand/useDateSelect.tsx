import { create } from 'zustand';

const d = new Date();
const year = d.getFullYear(); // 년
const month = d.getMonth(); // 월
const day = d.getDate(); // 일

// export interface DayOfWeekInterface {
//   day: string;
//   id: number;
//   isSelected: boolean;
// }

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
  selectedDays: number[];
  startTime: TimeTypeInInterface;
  finishTime: TimeTypeInInterface;
  setStartDate: (newStartDate: DateTypeInInterface) => void;
  setFinishDate: (newFinishDate: DateTypeInInterface) => void;
  setSelectedDays: (newSelectedDays: number[]) => void;
  setStartTime: (newStartTime: TimeTypeInInterface) => void;
  setFinishTime: (newFinishTime: TimeTypeInInterface) => void;
}

export const useDateSelect = create<DateInterface>(set => ({
  startDate: { year, month: month + 1, day: day + 7 },
  finishDate: { year, month: month + 1, day: day + 7 },
  selectedDays: [],
  startTime: { hour: 9, minute: 0, dayTime: 'AM' },
  finishTime: { hour: 10, minute: 0, dayTime: 'AM' },
  setStartDate: (newStartDate: { year: number; month: number; day: number }) =>
    set(state => ({ ...state, startDate: newStartDate })),
  setFinishDate: (newFinishDate: { year: number; month: number; day: number }) =>
    set(state => ({ ...state, finishDate: newFinishDate })),
  setSelectedDays: (newSelectedDays: any[]) => set(state => ({ ...state, selectedDays: newSelectedDays })),
  setStartTime: (newStartTime: { hour: number; minute: number; dayTime: string }) =>
    set(state => ({ ...state, startTime: newStartTime })),
  setFinishTime: (newFinishTime: { hour: number; minute: number; dayTime: string }) =>
    set(state => ({ ...state, finishTime: newFinishTime })),
}));
