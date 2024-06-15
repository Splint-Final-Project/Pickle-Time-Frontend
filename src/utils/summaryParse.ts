interface ParsedSchedule {
  day: string;
  time: string;
  date: string;
}

export default function summaryParse(schedule: string): ParsedSchedule {
  const dayPattern = /(월|화|수|목|금|토|일)(?![^,])/g;
  const timePattern = /(오전|오후) \d{2}시 \d{2}분/g;
  const datePattern = /\d{2}월 \d{2}일 부터 ~ \d{2}월 \d{2}일 까지/;

  const days = schedule.match(dayPattern);
  const times = schedule.match(timePattern);
  const dateRange = schedule.match(datePattern);

  if (!days || !times || !dateRange) {
    throw new Error('Invalid schedule format');
  }

  const formattedTimes = times.map(time => {
    return time.replace(/(오전|오후) (\d{2})시 (\d{2})분/, '$1 $2:$3').toLowerCase();
  });

  const formattedDateRange = dateRange[0].replace(
    /(\d{2})월 (\d{2})일 부터 ~ (\d{2})월 (\d{2})일 까지/,
    '$1/$2 ~ $3/$4',
  );

  return {
    day: days.join(', '),
    time: formattedTimes.join(' ~ '),
    date: formattedDateRange,
  };
}
