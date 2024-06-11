import { MouseEventHandler, PropsWithChildren, useState } from "react";
import DateButton from "./DateButton";
import styled from "@emotion/styled";

const DAY_OF_WEEK = [
  { day: "일", id: 0 , isClicked: false},
  { day: "월", id: 1 , isClicked: false},
  { day: "화", id: 2 , isClicked: false},
  { day: "수", id: 3 , isClicked: false},
  { day: "목", id: 4 , isClicked: false},
  { day: "금", id: 5 , isClicked: false},
  { day: "토", id: 6 , isClicked: false},
];

interface Day {
  day: string;
  id: number;
  isClicked: boolean;
}

export default function DateButtonList({ children }: PropsWithChildren) {
  const [days, setDays] = useState<Day[]>(DAY_OF_WEEK);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, clickedDayId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDays(days.map(day =>
      day.id === clickedDayId
        ? { ...day, isClicked: !day.isClicked }
        : day
    ));
  }

  return (
    <S.Container>
      <S.TimerText>{children}</S.TimerText>
      <S.ButtonContainer>
        {days.map(dayOfWeek => 
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
