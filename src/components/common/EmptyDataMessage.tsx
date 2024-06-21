import styled from '@emotion/styled';
import EmptyCharacter from '@/assets/icons/emptyDataCharacter.svg';
interface EmptyDataMessageProps {
  children: string;
}

export default function EmptyDataMessage({ children }: EmptyDataMessageProps) {
  return (
    <S.Wrapper>
      <S.Message>{children}</S.Message>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    margin-top: 4rem;
    width: 100%;
    font-size: 3.2rem;
    color: #8b8d94;
    font-weight: 700;
    position: relative;
    text-align: center;
    padding: 1rem;
  `,

  Message: styled.span`
    background-image: url(${EmptyCharacter});
    background-repeat: no-repeat;
    background-position: 5px 2px;
    padding: 2rem 0;
  `,
};
