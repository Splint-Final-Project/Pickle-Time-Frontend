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
