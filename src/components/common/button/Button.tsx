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

const Styled = {
  Button: styled.button<{
    $styleType: ButtonType;
  }>`
    width: 100%;
    padding: 1.3rem 0;
    border-radius: 0.4rem;
    ${({ theme }) => theme.typography.body1}
    white-space: nowrap;
    ${({ $styleType }) => buttonStyleByType[$styleType]}
  `,
};
