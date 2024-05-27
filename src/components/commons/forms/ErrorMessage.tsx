import React from 'react';

//TODO : 스타일 컴포넌트로 만들기
export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}
