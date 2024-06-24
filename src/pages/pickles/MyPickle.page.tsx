import styled from '@emotion/styled';
import MyPickleListContainer from '@/components/myPicklePage/MyPickleListContainer';
import TodayPickleListContainer from '@/components/myPicklePage/TodayPickleListContainer';
import BackButton from '@/components/common/button/BackButton';

export default function MyPickles() {
  return (
    <S.Container>
      <S.Title>
        <BackButton />
        <div>내 피클</div>
      </S.Title>
      <S.TodayPickleSection>
        <TodayPickleListContainer />
      </S.TodayPickleSection>
      <S.Line />
      <S.MyPickleListSection>
        <MyPickleListContainer />
      </S.MyPickleListSection>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    padding: 6rem 0 9.6rem;
  `,
  Title: styled.h1`
    display: flex;
    align-items: center;
    gap: 2.2rem;
    padding: 0 3.5rem;
    ${({ theme }) => theme.typography.header}
  `,
  TodayPickleSection: styled.section`
    padding: 0 1.6rem 3.2rem;
  `,
  Line: styled.div`
    height: 1.2rem;
    background: #f6f6f6;
  `,
  MyPickleListSection: styled.section`
    padding: 2.8rem 1.6rem 0;
  `,
};
