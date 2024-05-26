import { ButtonHTMLAttributes } from 'react';
import { BUTTON_TYPE } from '@/constants/BUTTON';
import styled from '@emotion/styled';
import { buttonStyleByType } from '@/styles/buttonStyles';

/**
 * 공통 버튼 컴포넌트
 */

type ButtonType = keyof typeof BUTTON_TYPE;
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  styleType?: ButtonType;
}

export default function Button({ children, styleType = BUTTON_TYPE.PRIMARY, ...htmlButtonProps }: ButtonProps) {
  return (
    <Styled.Button $styleType={styleType} {...htmlButtonProps}>
      {children}
    </Styled.Button>
  );
}

//TODO : 디자인 확정 시 수정
const Styled = {
  Button: styled.button<{
    $styleType: ButtonType;
  }>`
    padding: 2rem 4rem;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    font-weight: 500;
    white-space: nowrap;
    ${({ $styleType }) => buttonStyleByType[$styleType]}
  `,
};
