import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled"

const DAY_TIME = ["AM", "PM"];

export default function DayTimeInTimer() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();

    setOffset(event.deltaY < 0 ? -1 : 1); 
  };

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        element.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  useEffect(() => {
    if (offset !== 0) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          let newIndex = prevIndex + offset;
          if (newIndex >= DAY_TIME.length) newIndex = 0;
          if (newIndex < 0) newIndex = DAY_TIME.length - 1;
          return newIndex;
        });
        setOffset(0);
      }, 150); // 애니메이션 시간 (300ms)

      return () => clearTimeout(timeout);
    }
  }, [offset, DAY_TIME.length]);

  const getAdjacentIndex = (offset: number) => {
    let newIndex = currentIndex + offset;
    if (newIndex >= DAY_TIME.length) newIndex = 0;
    if (newIndex < 0) newIndex = DAY_TIME.length - 1;
    return newIndex;
  };

  return (
    <S.Container ref={containerRef}>
      <S.TimeText>
        <S.TimeItem isCurrent={false}>{DAY_TIME[getAdjacentIndex(-1)]}</S.TimeItem>
        <S.TimeItem isCurrent={true}>{DAY_TIME[currentIndex]}</S.TimeItem>
        <S.TimeItem isCurrent={false}>{DAY_TIME[getAdjacentIndex(1)]}</S.TimeItem>
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
    gap: 1.2rem;
  `,

  TimeItem: styled.span<{ isCurrent: boolean}>`
    color: ${({ isCurrent }) => (isCurrent ? '#000' : '#BABABA')};
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
`,
}
