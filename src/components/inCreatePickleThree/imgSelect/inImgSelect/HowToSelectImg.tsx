import { ReactNode } from "react";
import styled from '@emotion/styled';

interface howToSelectInterface {
  children: ReactNode,
  src: string | undefined,
  handler: () => void,
}

export default function HowToSelectImg({ children, src, handler } : howToSelectInterface) {

  return (
    <S.Container onClick={handler}>
      <img src={src}/>
      <S.Text>{children}</S.Text>
    </S.Container>
  )
}

const S = {
  Container: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 4.5rem;
    flex-shrink: 0;
    border-radius: 0.4rem;
    background: #F3F4F6;
    gap: 1rem;
  `,

  Text: styled.span`
    color: #8B8D94;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `
}