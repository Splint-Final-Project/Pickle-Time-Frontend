import { ReactNode } from "react";
import DateButton from "./DateButton";
import { useDateSelect } from "@/hooks/zustand/useDateSelect";
import styled from "@emotion/styled";

interface ButtonListProps {
  children: ReactNode,
}

export default function DateButtonList({ children }: ButtonListProps) {
  const { weekend, setWeekend } = useDateSelect();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, clickedDayId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setWeekend(weekend.map(day =>
      day.id === clickedDayId
        ? { ...day, isClicked: !day.isClicked }
        : day
    ));
  }

  return (
    <S.Container>
      <S.TimerText>{children}</S.TimerText>
      <S.ButtonContainer>
        {weekend.map(dayOfWeek => 
          <DateButton 
            key={dayOfWeek.id}
            dayId={dayOfWeek.id} 
            onClick={handleClick} 
            isClicked={dayOfWeek.isClicked}
          >
            {dayOfWeek.day}
          </DateButton>
        )}
      </S.ButtonContainer>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    /* width: 30.4rem; */
    width: 100%;
    gap: 0.8rem;
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.7rem;
    flex-shrink: 0;
  `,

  TimerText: styled.span`
    color: #8b8d94;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.7rem;
    font-style: normal;
  `,
};
