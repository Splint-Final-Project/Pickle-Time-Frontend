import HourInTimer from './HourInTimer';
import MinuteInTimer from './MinuteInTimer';
import DayTimeInTimer from './DayTimeInTimer';
import usePickleCreation, { TimeTypeInInterface } from '@/hooks/zustand/usePickleCreation';
import styled from '@emotion/styled';

export default function Timer() {
  const { startTime, finishTime, setStartTime, setFinishTime } = usePickleCreation();

  return (
    <S.Container>
      <S.Timer>
        <S.TimerText>From</S.TimerText>
        <S.TimerContainer>
          <HourInTimer minTime={1} maxTime={24} time={startTime} setTime={setStartTime} />
          <S.TimeText>:</S.TimeText>
          <MinuteInTimer minTime={0} maxTime={50} time={startTime} setTime={setStartTime} />
        </S.TimerContainer>
      </S.Timer>
      <S.Timer>
        <S.TimerText>To</S.TimerText>
        <S.TimerContainer>
          <HourInTimer minTime={1} maxTime={24} time={finishTime} setTime={setFinishTime} />
          <S.TimeText>:</S.TimeText>
          <MinuteInTimer minTime={0} maxTime={50} time={finishTime} setTime={setFinishTime} />
        </S.TimerContainer>
      </S.Timer>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 2rem;
  `,
  
  Timer: styled.div`
    display: flex;
    gap: 8px;
    width: 50%;
    flex-direction: column;
    align-items: flex-start;
  `,

  TimerContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    /* flex: 1 1 auto; */
    font-family: Pretendard;
    font-size: 2.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,
};
