import { ReactNode } from 'react';
import DayButton from './DayButton';
import styled from '@emotion/styled';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';

export default function DayButtonList() {
  const { when, setSelectedDays } = usePickleCreation();
  const { selectedDays } = when;
  const yoils = ['일', '월', '화', '수', '목', '금', '토'];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, clickedDayId: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedDays.includes(clickedDayId)) {
      setSelectedDays(selectedDays.filter(dayId => dayId !== clickedDayId));
    } else {
      setSelectedDays([...selectedDays, clickedDayId]);
    }
  };

  return (
    <S.Container>
      <S.TimerText>요일</S.TimerText>
      <S.ButtonContainer>
        {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => (
          <DayButton key={dayIndex} dayId={dayIndex} onClick={handleClick} isSelected={selectedDays.includes(dayIndex)}>
            {yoils[dayIndex]}
          </DayButton>
        ))}
      </S.ButtonContainer>
    </S.Container>
  );
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
