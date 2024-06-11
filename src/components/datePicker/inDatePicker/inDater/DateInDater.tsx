import { ReactNode } from "react";
import styled from "@emotion/styled"
import { useHandleTimeWithWheel } from "../../hooks";

interface TimeTextProps {
  maxTime: number;
  children: ReactNode;
}

export default function DateInDater({maxTime, children }: TimeTextProps) {
  const { getAdjacentTime, containerRef } = useHandleTimeWithWheel(maxTime);

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
