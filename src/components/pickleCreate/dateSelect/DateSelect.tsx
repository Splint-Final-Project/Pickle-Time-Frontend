import Timer from './Timer';
import DayButtonList from './DayButtonList';
import styled from '@emotion/styled';
import { oneWeekCalculate, totalMeetingTimesCalculate } from '@/utils/dateCalculate';
import { useEffect, useState } from 'react';
import Gigan from './Gigan';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';

export default function DateSelect() {
  const { when, setTimes, setDeadLine } = usePickleCreation();

  const handleWhenCalculate = () => {
    // deadline
    const oneWeekLater = oneWeekCalculate();
    setDeadLine(oneWeekLater);

    // when
    const { times } = totalMeetingTimesCalculate({
      startDate: when?.startDate,
      finishDate: when?.finishDate,
      selectedDays: when?.selectedDays,
      startTime: when?.startTime,
      finishTime: when?.finishTime,
      deadline: oneWeekLater,
    });

    setTimes(times);
  };

  useEffect(() => {
    handleWhenCalculate();
  }, [when.selectedDays, when.startDate, when.finishDate, when.startTime, when.finishTime]);

  return (
    <S.Container>
      <S.Text>일정을 선택해 주세요</S.Text>
      <Gigan />
      <DayButtonList />
      <Timer />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;

    gap: 2.3rem;
    .rdrCalendarWrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: space-between;
    }
    .rdrMonthAndYearWrapper {
      display: none !important;
    }
    .rdrMonth {
      padding: 0;
      padding-right: 10px;
    }
  `,

  Text: styled.span`
    color: #292929;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,
};
