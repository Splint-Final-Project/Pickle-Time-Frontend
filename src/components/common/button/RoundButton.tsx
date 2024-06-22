import { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { ROUND_BUTTON_COLOR } from '@/constants/BUTTON';
import { roundButtonStyle } from '@/styles/buttonStyles';

/**
 * 라운드형 버튼(주로 모달에서 사용)
 * - GRAY : 취소의 역할
 * - BLACK : 확인
 */

type RoundButtonColor = keyof typeof ROUND_BUTTON_COLOR;
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: RoundButtonColor;
}

export default function RoundButton({ children, color = ROUND_BUTTON_COLOR.GRAY, ...htmlButtonProps }: ButtonProps) {
  return (
    <Styled.Button $color={color} {...htmlButtonProps}>
      {children}
    </Styled.Button>
  );
}

const Styled = {
  Button: styled.button<{
    $color: RoundButtonColor;
  }>`
    width: 100%;
    padding: 1rem 6rem;
    border-radius: 2rem;
    ${({ theme }) => theme.typography.subTitle2}
    white-space: nowrap;
    ${({ $color }) => roundButtonStyle[$color]}
  `,
};
