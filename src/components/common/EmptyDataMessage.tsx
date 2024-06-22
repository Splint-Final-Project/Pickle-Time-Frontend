import styled from '@emotion/styled';
import EmptyCharacter from '/icons/emptyDataCharacter.svg';
import { HtmlHTMLAttributes } from 'react';
interface EmptyDataMessageProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: string;
}

export default function EmptyDataMessage({ children, ...htmlDivprops }: EmptyDataMessageProps) {
  return (
    <S.Wrapper {...htmlDivprops}>
      <S.Message>{children}</S.Message>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    margin-top: 4rem;
    width: 100%;
    font-size: 1.4rem;
    font-weight: 600;
    position: relative;
    text-align: center;
    padding: 1rem;
    color: #8b8d94;
  `,

  Message: styled.span`
    background-image: url(${EmptyCharacter});
    background-repeat: no-repeat;
    background-position: 1px 0px;
    padding: 2rem 0;
  `,
};
