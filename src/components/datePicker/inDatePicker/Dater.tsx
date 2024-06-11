import { PropsWithChildren, useState } from 'react';
import styled from '@emotion/styled';
import DateInDater from './inDater/DateInDater';
import { useMaxDaysInMonth, useHandleTimeWithWheel } from '../hooks';
import MonthInDater from './inDater/MonthInDater';

const THIS_YEAR = new Date().getFullYear();

export default function Dater({ children }: PropsWithChildren) {
  const { getAdjacentTime, containerRef, time } = useHandleTimeWithWheel(1, 12);
  const maxDays = useMaxDaysInMonth(time, THIS_YEAR);
  
  return (
    <S.Container>
      <S.TimerText>{children}</S.TimerText>
      <S.TimerContainer>
        <S.TimeText/>
        <MonthInDater getAdjacentTime={getAdjacentTime} containerRef={containerRef}>월</MonthInDater>
        <S.TimeText/>
        <DateInDater minTime={1} maxTime={maxDays}>일</DateInDater>
      </S.TimerContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    /* width: 30.4rem; */
    width: 100%;
    gap: 0.8rem;
  `,

  TimerContainer: styled.div`
    display: flex;
    align-items: center;
    height: 6.2rem;
    flex-shrink: 0;
    border-radius: 0.4rem;
    background: #f3f4f6;
  `,

  TimerText: styled.span`
    color: #8b8d94;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.7rem;
    font-style: normal;
  `,

  TimeText: styled.span`
    flex: 1 1 auto;
    color: #000;
    /* Header */
    font-family: Pretendard;
    font-size: 2.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,
};
