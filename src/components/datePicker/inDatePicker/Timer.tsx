import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import TimeInTimer from './inTimer/TimeInTimer';
import DayTimeInTimer from './inTimer/DayTimeInTimer';

export default function Timer({ children }: PropsWithChildren) {
  return (
    <S.Container>
      <S.TimerText>{children}</S.TimerText>
      <S.TimerContainer>
        <S.TimeText/>
        <TimeInTimer minTime={1} maxTime={12} />
        <S.TimeText>:</S.TimeText>
        <TimeInTimer minTime={0} maxTime={59} />
        <DayTimeInTimer />
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
