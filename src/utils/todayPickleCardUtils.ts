export function isButtonActive(startHour: number, startMinute: number) {
  const now = new Date();

  const startTime = new Date();
  startTime.setHours(startHour, startMinute, 0, 0);

  const prev10 = new Date(startTime);
  prev10.setMinutes(startTime.getMinutes() - 10);

  const after10 = new Date(startTime);
  after10.setMinutes(startTime.getMinutes() + 10);

  return now >= prev10 && now <= after10;
}

export function getTimeGapMessage(startHour: number, startMinute: number): string | undefined {
  const now = new Date();
  const ONE_MINUTE = 60000;
  const startTime = new Date();
  startTime.setHours(startHour, startMinute, 0, 0);
  const timeGap = (startTime.getTime() - now.getTime()) / ONE_MINUTE;

  if (timeGap > 65 || timeGap < 0) return;

  if (timeGap <= 65 && timeGap >= 55) return '! 피클 한 시간 전이에요';
  else if (timeGap <= 35 && timeGap >= 25) return '! 피클 30분 전이에요';
  else if (timeGap <= 10 && timeGap >= 5) return '! 피클 5분 전이에요';
  else return '피클 곧 시작이에요!';
}

export const untilChulseok = (pickleStart: any, pickleFinish: any) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (!pickleStart || !pickleFinish) return '';

  // Calculate time difference in minutes
  const minutesUntilStart = (pickleStart.hour * 60 + pickleStart.minute) - (hours * 60 + minutes);
  const minutesUntilFinish = (pickleFinish.hour * 60 + pickleFinish.minute) - (hours * 60 + minutes);

  if (minutesUntilStart > 60) return `피클 ${Math.floor(minutesUntilStart / 60)}시간 전이에요`;
  if (minutesUntilStart > 0) return `피클 ${minutesUntilStart}분 전이에요`;
  if (minutesUntilStart <= 0 && minutesUntilFinish > 60) return `피클 종료까지 ${Math.floor(minutesUntilFinish / 60)}시간 남았어요`;
  if (minutesUntilStart <= 0 && minutesUntilFinish > 0) return `피클 종료까지 ${minutesUntilFinish}분 남았어요`;

  return '피클이 종료되었어요';
};

export const calculateInterval = (currentTime: Date, pickleStart: any, pickleFinish: any) => {
  const startTime = new Date(currentTime);
  startTime.setHours(pickleStart.hour);
  startTime.setMinutes(pickleStart.minute);
  
  const finishTime = new Date(currentTime);
  finishTime.setHours(pickleFinish.hour);
  finishTime.setMinutes(pickleFinish.minute);

  const timeToStart = startTime.getTime() - currentTime.getTime();
  const timeToFinish = finishTime.getTime() - currentTime.getTime();

  if (timeToStart > 3600000 || timeToFinish > 3600000) {
    return 3600000; // 1시간
  } else if (timeToStart > 600000 || timeToFinish > 600000) {
    return 600000; // 10분
  } else {
    return 60000; // 1분
  }
};