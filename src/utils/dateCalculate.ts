import { DateTypeInInterface, TimeTypeInInterface } from '@/hooks/zustand/usePickleCreation';

export interface MeetingTimesInterface {
  startDate: DateTypeInInterface;
  finishDate: DateTypeInInterface;
  selectedDays: number[];
  startTime: TimeTypeInInterface;
  finishTime: TimeTypeInInterface;
  deadline: Date;
}

export const oneWeekCalculate = (): Date => {
  const now = new Date();
  const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7일을 밀리초로 변환하여 더함
  return oneWeekLater;
};

export const totalMeetingTimesCalculate = ({
  startDate,
  finishDate,
  selectedDays,
  deadline,
  startTime,
  finishTime,
}: MeetingTimesInterface): { times: Date[] } => {
  const start = new Date(
    new Date().getFullYear(),
    startDate.month - 1,
    startDate.day,
    startTime.hour,
    startTime.minute,
  );
  let finish = new Date(
    new Date().getFullYear(),
    finishDate.month - 1,
    finishDate.day,
    startTime.hour,
    startTime.minute,
  );

  // 2. StartTime이 finishTime보다 큰 경우 에러 발생
  if (
    startTime.hour > finishTime.hour ||
    (startTime.hour === finishTime.hour && startTime.minute > finishTime.minute)
  ) {
    // console.log(startTime.hour, finishTime.hour, startTime.minute, finishTime.minute);
    console.log('StartTime이 finishTime보다 큰 경우 에러 발생');
    return { times: [] };
  }

  const result: Date[] = [];

  for (let d = new Date(start); d <= finish; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    const activeDay = selectedDays.find(dayIndex => dayIndex === dayOfWeek);
    if (activeDay !== undefined) {
      result.push(new Date(d));
    }
  }

  // 피클 모집 마감 일자 보다 시작 시간이 앞서면, 에러 발생 => 이거도 사실 필요 없어요
  if (result[0] < deadline) {
    console.log('피클 모집 마감 일자 보다 시작 시간이 앞서면, 에러 발생');
    return { times: [] };
  }
  const yoils = ['일', '월', '화', '수', '목', '금', '토'];
  let daysString = '';
  selectedDays.sort((a, b) => a - b);
  selectedDays.forEach(day => {
    if (daysString === '') {
      daysString += yoils[day];
      return;
    }
    daysString += ', ' + yoils[day];
  });

  // const startDateFormatted = `${startDate.month.toString().padStart(2, '0')}월 ${startDate.day.toString().padStart(2, '0')}일`;
  // const finishDateFormatted = `${finishDate.month.toString().padStart(2, '0')}월 ${finishDate.day.toString().padStart(2, '0')}일`;
  // const startTimeFormatted = formatTime(startTime);
  // const finishTimeFormatted = formatTime(finishTime);

  // const summary = `매주 ${daysString}, ${startTimeFormatted} ~ ${finishTimeFormatted} (${startDateFormatted} 부터 ~ ${finishDateFormatted} 까지)`;
  // console.log(summary);
  return { times: result };
};

export const meetingTimesSummary = () => {};

export const formatTime = (time: { hour: number; minute: number , _id: any}): string => {
  if (!time) return '';

  const period = time.hour < 12 ? 'am' : 'pm';

  let newHour = time.hour;
  if (time.hour > 12) {
    newHour = newHour - 12;
  }
  const hour = newHour.toString().padStart(2, '0');
  const minute = time.minute.toString().padStart(2, '0');
  return `${hour}: ${minute} ${period}`;
};

export const untilChulseok = (now: {hour: number, minute: number}, pickleStart: {hour: number, minute: number, _id: any}) => {
  if (!now || !pickleStart) return '';

  const leftHour = now.hour - pickleStart.hour;
  const leftMinute = now.minute - pickleStart.minute;
  if (leftHour > 0) return `피클 ${leftHour}시간 전이에요`;
  if (leftHour === 0) {
    if (leftMinute > 0) return `피클 ${leftMinute}분 전이에요`;

    if (leftMinute < 0) return `피클이 진행 중이에요!`;
  }
};