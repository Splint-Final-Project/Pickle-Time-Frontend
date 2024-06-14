import { ReactNode, useEffect } from "react";
import { useHandleTimeWithWheel } from "../../hooks";
import { DateTypeInInterface } from '@/hooks/zustand/useDateSelect';
import styled from "@emotion/styled"

interface DateInDaterProps {
  minTime: number;
  maxTime: number;
  children: ReactNode;
  date: DateTypeInInterface,
  setDate: (newStartDate: DateTypeInInterface) => void;
}

export default function DateInDater({minTime, maxTime, children, date, setDate }: DateInDaterProps) {
  const { getAdjacentTime, containerRef, time } = useHandleTimeWithWheel(minTime, maxTime);

  useEffect(() => {
    setDate({ ...date, day: time});
  }, [time])

  return (
    <S.Container ref={containerRef}>
      <S.TimeText>
        <S.TimeItem isCurrent={false}>{getAdjacentTime(-1)}{children}</S.TimeItem>
        <S.TimeItem isCurrent={true}>{getAdjacentTime(0)}{children}</S.TimeItem>
        <S.TimeItem isCurrent={false}>{getAdjacentTime(1)}{children}</S.TimeItem>
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
}
