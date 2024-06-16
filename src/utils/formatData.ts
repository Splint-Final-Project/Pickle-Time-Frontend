import { When } from '@/apis/types/pickles.type';

// 원화
export const formatCurrency = (cost: number): string => {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(cost).replace('₩', '');
};

// 요일 추출(D, D, ...)
export const formatDays = (when: When): string => {
  const match = when?.summary.match(/매주\s([\uac00-\ud7a3]+(?:,\s[\uac00-\ud7a3]+)*)/);
  return match ? match[1].replace(/\s/g, ' ') : '';
};

// 시간 추출(00:00 am/pm ~ 00:00 am/pm)
export const formatTimeRange = (when: When): string => {
  const match = when?.summary.match(/(AM|PM)\s(\d{2}시\s\d{2}분)\s~\s(AM|PM)\s(\d{2}시\s\d{2}분)/);
  if (match) {
    const startPeriod = match[1].toLowerCase();
    const endPeriod = match[3].toLowerCase();
    const startTime = match[2].replace('시', ' :').replace('분', '');
    const endTime = match[4].replace('시', ' :').replace('분', '');
    return `${startTime} ${startPeriod} ~ ${endTime} ${endPeriod}`;
  }
  return '';
};

// 기간 추출(MM. DD ~ MM. DD)
export const formatPeriod = (when: When): string => {
  const startDate = new Date(when?.times[0]);
  const endDate = new Date(when?.times[when.times.length - 1]);
  const formatDate = (date: Date) =>
    `${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`;
  return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
};
