import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import TimeInTimer from './inTimer/TimeInTimer';
import DayTimeInTimer from './inTimer/DayTimeInTimer';

export default function Timer({ children }: PropsWithChildren) {
  return (
    <S.Container>
      <S.TimerText>{children}</S.TimerText>
      <S.TimerContainer>
        <TimeInTimer maxTime={12} />
        <S.TimeText>:</S.TimeText>
        <TimeInTimer maxTime={60} />
        <DayTimeInTimer />
      </S.TimerContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 30.4rem;
    gap: 0.8rem;
  `,

  TimerContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
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
    font-family: Pretendard;
    font-size: 2.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,
};
