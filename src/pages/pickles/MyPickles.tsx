import MyPickleListContainer from '@/components/myPicklePage/MyPickleListContainer';

import TodayPickleListContainer from '@/components/myPicklePage/TodayPickleListContainer';
import { useGetProceedingPickles } from '@/hooks/query/pickles';
import styled from '@emotion/styled';

export default function MyPickles() {
  useGetProceedingPickles();
  return (
    <S.Container>
      <S.Title>내 피클</S.Title>
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
    padding: 8rem 0 9.6rem;
  `,
  Title: styled.h1`
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
    padding: 0 1.6rem;
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
