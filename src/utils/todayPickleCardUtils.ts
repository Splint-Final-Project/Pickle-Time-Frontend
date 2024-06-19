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
