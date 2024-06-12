import { DayOfWeekInterface, DateTypeInInterface, TimeTypeInInterface } from "@/hooks/zustand/useDateSelect";

export interface MeetingTimesInterface {
  startDate: DateTypeInInterface,
  finishDate: DateTypeInInterface,
  weekend: DayOfWeekInterface[],
  startTime: TimeTypeInInterface,
  finishTime: TimeTypeInInterface
}

export const deadlineCalculate = () => {
  const now = new Date();
  const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14일을 밀리초로 변환하여 더함
  return twoWeeksLater;
};

export const totalMeetingTimesCalculate = ({ 
    startDate, 
    finishDate, 
    weekend, 
    startTime, 
    finishTime 
  }: MeetingTimesInterface): Date[] => {
  const result: Date[] = [];
  const startConverted = convertTo24HourFormat(startTime);
  const finishConverted = convertTo24HourFormat(finishTime);
  
  const start = new Date(new Date().getFullYear(), startDate.month - 1, startDate.day, startConverted.hour, startConverted.minute);
  const finish = new Date(new Date().getFullYear(), finishDate.month - 1, finishDate.day, finishConverted.hour, finishConverted.minute);

  for (let d = new Date(start); d <= finish; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    const activeDay = weekend.find(day => day.id === dayOfWeek && day.isClicked);
    if (activeDay) {
      result.push(new Date(d));
    }
  }
  
  return result;
}; // 리턴 타입은 배열로!

const convertTo24HourFormat = (time: { hour: number, minute: number, dayTime: string }): { hour: number, minute: number } => {
  let hour = time.hour;
  if (time.dayTime === "PM" && hour < 12) {
    hour += 12;
  } else if (time.dayTime === "AM" && hour === 12) {
    hour = 0;
  }
  return { hour, minute: time.minute };
};