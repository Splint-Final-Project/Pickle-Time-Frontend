import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import routes from '@/constants/routes';
import { When } from '@/apis/types/pickles.type';
import { formatCurrency } from '@/utils/formatData';
import CategoryExercise from '@/assets/images/pickleCategoryImg-exercise.png';
import CategoryStudy from '@/assets/images/pickleCategoryImg-study.png';
import HeartButton from '../common/button/HeartButton';
import { useGetLikeCount, useDeletePickleLikeMutation, usePickleLikeMutation } from '@/hooks/query/like';

interface WholePickleCardProps {
  type: 'study' | 'exercise';
  id: string;
  title: string;
  when: When;
  cost: number;
}

export default function WholePickleCard({ id: pickleId, type, title, cost }: WholePickleCardProps) {
  const { data } = useGetLikeCount(pickleId);
  const { mutate: postLikeMutate } = usePickleLikeMutation(pickleId);
  const { mutate: deleteLikeMutate } = useDeletePickleLikeMutation(pickleId);

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
    <S.CardLayer to={`${routes.pickle}/${pickleId}`} $backImgType={type}>
      <HeartButton $active={data?.data.isClicked} onClick={handleHeartClick} />
      <S.Title>{title}</S.Title>
      <S.Price>{formatCurrency(cost)}원</S.Price>
    </S.CardLayer>
  );
}

const S = {
  CardLayer: styled(Link, {
    shouldForwardProp: prop => prop !== '$backImgType',
  })<{ $backImgType: 'study' | 'exercise' }>`
    position: relative;
    display: block;
    height: 10.7rem;
    padding: 1.2rem 0 1.2rem 1.4rem;
    border-radius: 0.4rem;
    background: #f3f4f6;
    background-image: ${({ $backImgType }) =>
      $backImgType === 'study' ? `url(${CategoryStudy})` : `url(${CategoryExercise})`};
    background-repeat: no-repeat;
    background-position: bottom 15px right 0;
    cursor: pointer;
  `,
  ProgressDay: styled.span`
    display: inline-block;
    color: #6f6f6f;
    font-size: 1rem;
    font-weight: 500;
  `,
  Title: styled.h3`
    width: 80%;
    margin-top: 1rem;
    margin-bottom: 1.2rem;
    color: #161616;
    ${({ theme }) => theme.typography.subTitle4}
    letter-spacing: -0.9px;
  `,
  Price: styled.em`
    color: #666;
    ${({ theme }) => theme.typography.detail}

    span {
      font-size: 1rem;
      font-weight: 500;
      margin-left: 0.2rem;
    }
  `,
  CategoryImg: styled.img`
    position: absolute;
    bottom: 1.5rem;
    right: 0;
  `,
};
