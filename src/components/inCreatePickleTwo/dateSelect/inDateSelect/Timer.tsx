import { ReactNode } from 'react';
import TimeInTimer from './inTimer/TimeInTimer';
import HourInTimer from './inTimer/HourInTimer';
import MinuteInTimer from './inTimer/MinuteInTimer';
import DayTimeInTimer from './inTimer/DayTimeInTimer';
import { TimeTypeInInterface } from '@/hooks/zustand/useDateSelect';
import styled from '@emotion/styled';

interface TimerInterface {
  children: ReactNode,
  time: TimeTypeInInterface,
  setTime: (newTime: TimeTypeInInterface) => void;
}

export default function Timer({ children, time, setTime }: TimerInterface) {
  return (
    <S.Container>
      <S.TimerText>{children}</S.TimerText>
      <S.TimerContainer>
        <S.TimeText/>
        <HourInTimer minTime={1} maxTime={12} time={time} setTime={setTime}/>
        <S.TimeText>:</S.TimeText>
        <MinuteInTimer minTime={0} maxTime={59} time={time} setTime={setTime}/>
        <DayTimeInTimer time={time} setTime={setTime}/>
      </S.TimerContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.8rem;
  `,

  TimerContainer: styled.div`
    display: flex;
    align-items: center;
    /* gap: 4rem; */
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
    color: #000;
    /* Header */
    flex: 1 1 auto;
    font-family: Pretendard;
    font-size: 2.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,
};
