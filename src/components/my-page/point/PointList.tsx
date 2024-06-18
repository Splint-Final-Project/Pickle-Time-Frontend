import styled from '@emotion/styled';
import { MyDynamicTemplate } from '@/styles/commonStyles';
import PointHistoryCard from '@/components/my-page/point/PointHistoryCard';

const pointListData = [
  {
    date: '24.06.05',
    amount: {
      plus: '500',
      minus: '',
    },
    history: '리뷰 작성 적립',
  },
  {
    date: '24.06.07',
    amount: {
      plus: '',
      minus: '600',
    },
    history: '피클 신청에 사용',
  },
  {
    date: '24.06.09',
    amount: {
      plus: '300',
      minus: '',
    },
    history: '리뷰 작성 적립',
  },
];

export default function PointList() {
  return (
    <MyDynamicTemplate>
      <h2>보유 포인트</h2>
      <h1>500P</h1>
      <S.Notice>
        <span>포인트 안내 사항을 확인해 보세요!</span>
        <img src="/icons/rightArrowIcon.svg" alt="더보기" />
      </S.Notice>
      <S.PointHistoryList>
        {pointListData?.map((data, index) => (
          <PointHistoryCard key={index} date={data?.date} amount={data?.amount} history={data?.history} />
        ))}
      </S.PointHistoryList>
    </MyDynamicTemplate>
  );
}

const S = {
  Notice: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1.5rem 1.3rem;
    margin: 1.7rem 0 1.3rem;
    border-radius: 1.5rem;
    background-color: ${({ theme }) => theme.color.card};

    span {
      ${({ theme }) => theme.typography.body1};
    }

    img {
      cursor: pointer;
    }
  `,

  PointHistoryList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
  `,
};
