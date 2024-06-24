import styled from '@emotion/styled';

export default function NoPickle() {
  return (
    <S.Container>
      <img src="/icons/noPickleIcon.svg" alt="피클 데이터 없음" />
      <S.Message>피클이 없어요!</S.Message>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
    width: 100%;
    min-height: 16.5rem;
  `,
  Message: styled.span`
    color: ${({ theme }) => theme.color.sub};
    ${({ theme }) => theme.typography.body1};
  `,
};
