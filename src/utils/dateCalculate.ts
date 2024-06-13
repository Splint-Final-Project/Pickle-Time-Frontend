import { DayOfWeekInterface, DateTypeInInterface, TimeTypeInInterface } from "@/hooks/zustand/useDateSelect";

export interface MeetingTimesInterface {
  startDate: DateTypeInInterface,
  finishDate: DateTypeInInterface,
  weekend: DayOfWeekInterface[],
  startTime: TimeTypeInInterface,
  finishTime: TimeTypeInInterface,
  deadline: Date,
}

export const deadlineCalculate = (): Date => {
  const now = new Date();
  const oneWeeksLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 14일을 밀리초로 변환하여 더함
  return oneWeeksLater;
};

export const totalMeetingTimesCalculate = async ({ 
  startDate, 
  finishDate, 
  weekend, 
  startTime, 
  finishTime,
  deadline
}: MeetingTimesInterface): Promise<{times: Date[], summary: string}> => {
  return new Promise((resolve, reject) => {
    const startConverted = convertTo24HourFormat(startTime);
    const finishConverted = convertTo24HourFormat(finishTime);

    const start = new Date(new Date().getFullYear(), startDate.month - 1, startDate.day, startConverted.hour, startConverted.minute);
    let finish = new Date(new Date().getFullYear(), finishDate.month - 1, finishDate.day, startConverted.hour, startConverted.minute);

    // 1. StartDate가 finishDate보다 큰 경우 : 1년 추가
    if (start > finish) {
      finish = new Date(new Date().getFullYear() + 1, finishDate.month - 1, finishDate.day, startConverted.hour, startConverted.minute);
    }

    // 2. StartTime이 finishTime보다 큰 경우 에러 발생
    if (startConverted.hour > finishConverted.hour || 
        (startConverted.hour === finishConverted.hour && startConverted.minute > finishConverted.minute)) {
      return reject(new Error('종료 시간이 시작 시간 이전입니다.'));
    }

    const result: Date[] = [];

    for (let d = new Date(start); d <= finish; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      const activeDay = weekend.find(day => day.id === dayOfWeek && day.isClicked);
      if (activeDay) {
        result.push(new Date(d));
      }
    }

    // 3. 적합한 날짜가 없어서 빈 배열을 반환할 경우 에러 발생
    if (result.length === 0) {
      return reject(new Error('선택한 날짜에 맞는 요일이 없습니다.'));
    }

    // 피클 모집 마감 일자 보다 시작 시간이 앞서면, 에러 발생
    if (result[0] < deadline) {
      return reject(new Error('피클 타임 시작은 모집 마감일 이후인 2주 뒤에 가능합니다.'));
    }
    const days = weekend.filter(day => day.isClicked).map(day => day.day).join(', ');
    const startDateFormatted = `${startDate.month.toString().padStart(2, '0')}월 ${startDate.day.toString().padStart(2, '0')}일`;
    const finishDateFormatted = `${finishDate.month.toString().padStart(2, '0')}월 ${finishDate.day.toString().padStart(2, '0')}일`;
    const startTimeFormatted = formatTime(startTime);
    const finishTimeFormatted = formatTime(finishTime);

    const summary = `매주 ${days}, ${startTimeFormatted} ~ ${finishTimeFormatted} (${startDateFormatted} 부터 ~ ${finishDateFormatted} 까지)`;


    return resolve({ times: result, summary: summary });
  });
};

export const meetingTimesSummary = () => {

}

const convertTo24HourFormat = (time: { hour: number, minute: number, dayTime: string }): { hour: number, minute: number } => {
  let hour = time.hour;
  if (time.dayTime === "PM" && hour < 12) {
    hour += 12;
  } else if (time.dayTime === "AM" && hour === 12) {
    hour = 0;
  }
  return { hour, minute: time.minute };
};

const formatTime = (time: { hour: number, minute: number, dayTime: string }): string => {
  const hour = time.hour % 12 === 0 ? 12 : time.hour % 12;
  const minute = time.minute.toString().padStart(2, '0');
  return `${time.dayTime} ${hour.toString().padStart(2, '0')}시 ${minute}분`;
};