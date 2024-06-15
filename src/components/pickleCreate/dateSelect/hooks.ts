import { useState, useEffect, useRef } from 'react';

export const useHandleTimeWithWheel = (minTime: number, maxTime: number, initTime: number, isMinute?: boolean) => {
  const [time, setTime] = useState<number>(initTime);
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
        setTime((prevTime: any) => {
          let newTime = prevTime + offset * (isMinute ? 10 : 1); // 분 단위일 때는 10씩 증가
          if (newTime > maxTime) newTime = minTime;
          if (newTime < minTime) newTime = maxTime;
          return newTime;
        });
        setOffset(0);
      }, 120); // 애니메이션 시간 (120ms)

      return () => clearTimeout(timeout);
    }
  }, [offset]);

  const getAdjacentTime = (offset: number) => {
    let newTime = time + offset * (isMinute ? 10 : 1); // 분 단위일 때는 10씩 증가
    if (newTime > maxTime) newTime = minTime;
    if (newTime < minTime) newTime = maxTime;
    return newTime.toString().padStart(2, '0');
  };

  return { getAdjacentTime, containerRef, time };
};
