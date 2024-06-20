import MyPickleListContainer from '@/components/myPicklePage/MyPickleListContainer';

import TodayPickleListContainer from '@/components/myPicklePage/TodayPickleListContainer';
import { useGetProceedingPickles } from '@/hooks/query/pickles';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

export default function MyPickles() {
  useGetProceedingPickles();
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Title>
        {' '}
        <img
          src="/icons/back.svg"
          alt="back"
          onClick={() => {
            navigate(-1);
          }}
        />
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
    padding: 0 17px;
    display: flex;
    align-items: center;
    gap: 22px;
    color: var(--Basic, #181f29);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    img {
      height: 16px;
      cursor: pointer;
    }
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
