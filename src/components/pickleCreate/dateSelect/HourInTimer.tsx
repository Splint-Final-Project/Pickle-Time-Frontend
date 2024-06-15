import { useEffect } from 'react';
import { useHandleTimeWithWheel } from '.';
import { TimeTypeInInterface } from '@/hooks/zustand/useDateSelect';
import styled from '@emotion/styled';

interface TimeTextProps {
  minTime: number;
  maxTime: number;
  time: TimeTypeInInterface;
  setTime: (newTime: TimeTypeInInterface) => void;
}

export default function HourInTimer({ minTime, maxTime, time, setTime }: TimeTextProps) {
  const { getAdjacentTime, containerRef, time: localScopeTime } = useHandleTimeWithWheel(minTime, maxTime);

  useEffect(() => {
    setTime({ ...time, hour: localScopeTime });
  }, [localScopeTime]);

  return (
    <S.Container ref={containerRef}>
      <S.TimeText>
        <S.TimeItem isCurrent={false}>{getAdjacentTime(-1)}</S.TimeItem>
        <S.TimeItem isCurrent={true}>{getAdjacentTime(0)}</S.TimeItem>
        <S.TimeItem isCurrent={false}>{getAdjacentTime(1)}</S.TimeItem>
      </S.TimeText>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    flex: 1 1 auto;
    overflow: hidden;
    height: 6rem;
    display: flex;
    align-items: center;
  `,

  TimeText: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  `,

  TimeItem: styled.span<{ isCurrent: boolean }>`
    color: ${({ isCurrent }) => (isCurrent ? '#000' : '#BABABA')};
    font-family: Pretendard;
    font-size: 2.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,
};
