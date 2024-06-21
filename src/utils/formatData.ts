import { When } from '@/apis/types/pickles.type';

// 원화
export const formatCurrency = (cost: number): string => {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(cost).replace('₩', '');
};

// 요일 추출(D, D, ...)
export const formatDays = (when: When): string => {
  if (!when?.selectedDays) return '';
  if (when?.selectedDays.length === 7) return '매일';
  return when?.selectedDays.map(day => ['일', '월', '화', '수', '목', '금', '토'][day]).join(', ') || '';
};

// 시간 추출(00:00 am/pm ~ 00:00 am/pm)
export const formatTimeRange = (when: When): string => {
  if (!when?.startTime || !when?.finishTime) return '';
  return `${('0' + when?.startTime.hour).slice(-2)}:${('0' + when?.startTime.minute).slice(-2)} ~ ${('0' + when?.finishTime.hour).slice(-2)}:${('0' + when?.finishTime.minute).slice(-2)}`;
};

// 기간 추출(MM. DD ~ MM. DD)
export const formatPeriod = (when: When): string => {
  if (!when?.startDate || !when?.finishDate) return '';
  return `${when?.startDate.month}/${when?.startDate.day} ~ ${when?.finishDate.month}/${when?.finishDate.day}`;
};

// YY.MM.DD 형태로 변환
export const formatYYMMDD = (date: Date): string => {
  const d = new Date(date);
  const year = (d.getFullYear() + '').substring(2); // 년도의 마지막 두 자리
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); // 월을 2자리 숫자로
  const day = d.getDate().toString().padStart(2, '0'); // 일을 2자리 숫자로

  return `${year}.${month}.${day}`;
};
