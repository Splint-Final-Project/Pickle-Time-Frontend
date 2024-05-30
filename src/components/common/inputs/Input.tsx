import React from 'react';
//TODO : 스타일 컴포넌트로 만들기
interface InputProps {
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: () => void;
}

function Input(
  { type, id, onChange, placeholder, value }: InputProps,
  ref: React.LegacyRef<HTMLInputElement> | undefined,
) {
  return <input type={type} id={id} onChange={onChange} placeholder={placeholder} value={value} ref={ref} />;
}

export default React.forwardRef(Input);
