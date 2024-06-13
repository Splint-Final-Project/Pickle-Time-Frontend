import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface PaymentSectionProps {
  children: ReactNode;
}
export default function PaymentSection({ children }: PaymentSectionProps) {
  return <S.Section>{children}</S.Section>;
}

const S = {
  Section: styled.section`
    width: 100%;
    padding: 3.2rem 3.5rem;
    background-color: #fff;
  `,
};
