import styled from '@emotion/styled';

import { When } from '@/apis/types/pickles.type';
import CategoryExercise from '@/assets/images/pickleCategoryImg-exercise.png';
import CategoryStudy from '@/assets/images/pickleCategoryImg-study.png';

interface WholePickleCardProps {
  type: 'study' | 'exercise';
  title: string;
  when: When;
  cost: number;
}

export default function WholePickleCard({ type, title, when, cost }: WholePickleCardProps) {
  return (
    <S.CardLayer $backImgType={type}>
      <S.ProgressDay>{when.summary}</S.ProgressDay>
      <S.Title>{title}</S.Title>
      <S.Price>{cost.toLocaleString('ko-KR')}원</S.Price>
    </S.CardLayer>
  );
}

const S = {
  CardLayer: styled.a<{ $backImgType: 'study' | 'exercise' }>`
    display: block;
    /* width: 15rem; */
    height: 10.7rem;
    /* margin: auto; */
    /* margin-top: 20px; */
    background: #f3f4f6;
    border-radius: 0.4rem;
    padding: 1.2rem 0 1.2rem 1.4rem;
    position: relative;
    background-image: ${({ $backImgType }) =>
      $backImgType === 'study' ? `url(${CategoryStudy})` : `url(${CategoryExercise})`};
    background-repeat: no-repeat;
    background-position: bottom 15px right 0;
  `,
  ProgressDay: styled.span`
    display: inline-block;
    color: #6f6f6f;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
  `,
  Title: styled.h3`
    color: #161616;
    font-size: 1.4rem;
    font-weight: 600;
    width: 80%;
    letter-spacing: -0.9px;
    margin-bottom: 1.2rem;
  `,
  Price: styled.em`
    color: #666;
    font-size: 1.2rem;
    font-weight: 600;
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
