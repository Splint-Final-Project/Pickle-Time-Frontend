import styled from '@emotion/styled';
import { useGetSpecialPickles } from '@/hooks/query/pickles';
import HeartButton from '@/components/common/button/HeartButton';
import useHeartButtonClick from '@/hooks/useHeartButtonClick';
import SpecialPickleCardArrowIcon from '@/assets/icons/SpecialPickleCardArrowIcon';
import routes from '@/constants/routes';
import { Link } from 'react-router-dom';
import PickleCardListMockData from '@/mocks/pickleCardListMockData';
import { useGetLikeCount, usePickleLikeMutation, useDeletePickleLikeMutation } from '@/hooks/query/like';

interface PickleCardListProps {
  category: 'hotTime' | 'popular';
}

const ONEDAY_MILLISECOND = 1000 * 60 * 60 * 24;

const calculateDday = (deadLine: string) => {
  const today = new Date().getTime();
  const deadLineMilliseconds = new Date(deadLine).getTime();
  return Math.floor((deadLineMilliseconds - today) / ONEDAY_MILLISECOND);
};

export default function PickleListCard({ category }: PickleCardListProps) {
  const { data } = useGetSpecialPickles(category);

  return (
    <>
      {data?.length ? (
        data.map((pickle: any) => <SpecialPickleCard key={pickle.id} pickleData={pickle} />)
      ) : (
        <h1>피클이 없네요 ㅠㅠ</h1>
      )}
      {/* <PickleCardListMockData /> */}
    </>
  );
}

function SpecialPickleCard({ pickleData }: { pickleData: any }) {
  const Dday = calculateDday(pickleData.deadLine);
  const { data } = useGetLikeCount(pickleData.id);
  const { mutate: postLikeMutate } = usePickleLikeMutation(pickleData.id);
  const { mutate: deleteLikeMutate } = useDeletePickleLikeMutation(pickleData.id);

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (data?.data.isClicked) {
      deleteLikeMutate();
    } else {
      postLikeMutate();
    }
  };

  return (
    <S.CardLayer to={`${routes.pickle}/${pickleData.id}`}>
      <S.Wrap>
        <S.DeadlineBadge>D-{Dday}</S.DeadlineBadge>
        <HeartButton size={22} $active={data?.data.isClicked} onClick={handleHeartClick} />
      </S.Wrap>
      <S.Title>{pickleData.title}</S.Title>
      <S.ResgisterStatus>
        {pickleData?.capacity}명 중 <span>{pickleData?.participantNumber}</span>명이 신청하는 중
      </S.ResgisterStatus>
      <S.Price>
        {pickleData.cost.toLocaleString()}
        <span>원</span>
      </S.Price>
      <S.Circle>
        <SpecialPickleCardArrowIcon />
      </S.Circle>
    </S.CardLayer>
  );
}

const S = {
  CardLayer: styled(Link)`
    display: block;
    margin: auto;
    width: 100%;
    height: 15rem;
    border-radius: 0.4rem;
    background: #fff;
    padding: 1.2rem 1rem 1.5rem 1.5rem;
    color: #161616;
    position: relative;
    box-shadow: 0px 1px 2.8px 0px rgba(0, 0, 0, 0.25);
    transition: 0.5s;
  `,
  Wrap: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  DeadlineBadge: styled.span`
    display: inline-block;
    min-width: 2.8rem;
    height: 1.3rem;
    padding: 0 0.6rem;
    background: #dbd8d8;
    border-radius: 0.8rem;
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 1.3rem;
    margin-bottom: 1.6rem;
  `,
  Title: styled.h3`
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 120.983%;
    letter-spacing: -0.8px;
    margin-bottom: 1.2rem;
    min-height: 3.4rem;

    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  `,
  ResgisterStatus: styled.span`
    display: inline-block;
    color: rgba(111, 111, 111, 0.6);
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: -0.5px;
    line-height: normal;
    margin-bottom: 0.6rem;
    span {
      font-weight: bold;
    }

    @media (max-width: 500px) {
      font-size: 1rem;
    }
  `,
  Price: styled.em`
    font-size: 2rem;
    font-weight: 600;
    line-height: normal;
    display: flex;
    align-items: center;
    span {
      font-size: 1.2rem;
      font-weight: 500;
      color: #2c2c2c;
      margin-left: 0.2rem;
      transform: translateY(1.2px);
    }

    @media (max-width: 500px) {
      font-size: 1.8rem;
    }
  `,
  Circle: styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: #6fa978;
    position: absolute;
    bottom: 1.7rem;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 500px) {
      width: 1.8rem;
      height: 1.8rem;
    }
  `,
};
