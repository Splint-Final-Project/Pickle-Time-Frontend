import styled from '@emotion/styled';
import PointHistoryCard from '@/components/my-page/point/PointHistoryCard';
import { MyDynamicTemplate } from '@/styles/commonStyles';
import { useMyPoints } from '@/hooks/query/points';

export default function PointList() {
  const { data } = useMyPoints();
  const pointsData = data?.data || [];

  return (
    <MyDynamicTemplate>
      <h2>보유 포인트</h2>
      <h1>{pointsData?.points || 0}P</h1>
      <S.Notice>
        <span>포인트 안내 사항을 확인해 보세요!</span>
        <img src="/icons/rightArrowIcon.svg" alt="더보기" />
      </S.Notice>
      {pointsData ? (
        <S.PointHistoryList>
          {(pointsData?.history || []).map((history: any, index: number) => (
            <PointHistoryCard
              key={index}
              date={history.date}
              type={history.type}
              remaining={history.remaining}
              amount={history.amount}
              message={history.message}
            />
          ))}
        </S.PointHistoryList>
      ) : (
        <S.NoPoints>현재 보유중인 포인트가 없어요 🥲</S.NoPoints>
      )}
    </MyDynamicTemplate>
  );
}

const S = {
  Notice: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1.5rem 1.7rem;
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

  NoPoints: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 10rem;
    color: ${({ theme }) => theme.color.sub};
    ${({ theme }) => theme.typography.body1};
  `,
};
