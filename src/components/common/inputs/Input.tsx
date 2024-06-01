import styled from '@emotion/styled';
import React from 'react';
//TODO : 스타일 컴포넌트로 만들기
interface InputProps {
  type: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: () => void;
}

function Input({ ...inputProps }: InputProps, ref: React.LegacyRef<HTMLInputElement> | undefined) {
  return <Styled.Input {...inputProps} ref={ref} />;
}

export default React.forwardRef(Input);
//TODO : 스타일링 추가 및 변경
const Styled = {
  Input: styled.input`
    width: 100%;
    padding: 8px 12px;
    border-radius: 8px;
    outline: none;
    border: 1px solid gray;
    &:focus {
      border: 1px solid green;
    }
  `,
};
