import { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';

interface ButtonInterface {
  children: ReactNode;
  dayId: number;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>, dayId: number) => void;
}

export default function DateButton({ children, dayId, isSelected: isSelected, onClick }: ButtonInterface) {
  return (
    <S.Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(e, dayId)} isSelected={isSelected}>
      <S.ButtonText isClicked={isSelected}>{children}</S.ButtonText>
    </S.Button>
  );
}

const S = {
  Button: styled.button<{ onClick: MouseEventHandler; isSelected: boolean }>`
    /* width: 3.8rem; */
    flex: 1 1 auto;
    height: 3rem;
    flex-shrink: 0;
    border-radius: 0.4rem;
    background: ${({ isSelected: isClicked }) => (isClicked ? '#5DC26D' : '#F1F1F1')};
  `,

  ButtonText: styled.span<{ isClicked: boolean }>`
    color: ${({ isClicked }) => (isClicked ? '#fff' : '#8B8D94')};
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.7rem;
  `,
};
