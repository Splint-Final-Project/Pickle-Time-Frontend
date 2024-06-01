import styled from '@emotion/styled';
import React from 'react';

//TODO : 스타일 컴포넌트로 만들기
export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <Styled.MessageBox>{children}</Styled.MessageBox>;
}
//TODO : 스타일링 추가 및 변경
const Styled = {
  MessageBox: styled.p`
    font-size: 12px;
    color: red;
    min-height: 12px;
    min-width: 1px;
    margin-top: 8px;
  `,
};
