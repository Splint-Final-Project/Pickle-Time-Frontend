import { useState, useEffect, useRef } from "react";

export const useHandleTimeWithWheel = (minTime: number, maxTime: number) => {
  const [time, setTime] = useState<number>(minTime);
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
        setTime((prevTime) => {
          let newTime = prevTime + offset;
          if (newTime > maxTime) newTime = minTime;
          if (newTime < minTime) newTime = maxTime;
          return newTime;
        });
        setOffset(0); 
      }, 150); // 애니메이션 시간 (300ms)

      return () => clearTimeout(timeout);
    }
  }, [offset]);

  const getAdjacentTime = (offset: number) => {
    let newTime = time + offset;
    if (newTime > maxTime) newTime = minTime;
    if (newTime < minTime) newTime = maxTime;
    return newTime.toString().padStart(2, '0');
  };

  return { getAdjacentTime, containerRef, time };
};

export const useMaxDaysInMonth = (month: number, year: number) => {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // 윤년 계산
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  if (month === 2 && isLeapYear(year)) {
    return 29; // 2월 윤년
  }

  return daysInMonth[month - 1];
}