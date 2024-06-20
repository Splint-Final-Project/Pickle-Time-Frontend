import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { pickleState } from './PickleStateFilterBar';
import { css } from '@emotion/react';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import ReviewModal from '../my-page/review/ReviewModal';

type Time = {
  times: Date[];
  startDate: any;
  finishDate: any;
  startTime: any;
  finishTime: any;
  selectedDays: any;
}

type CategoryType = '운동' | '취미' | '스터디';

export type PickleDataType = {
  title: string;
  duration: string;
  place: string;
  category: CategoryType;
  state: pickleState;
  id: string;
  when: Time;
};
//TODO : 동적으로 값 받게하기
interface MyPickleCardProps {
  pickleData: PickleDataType;
}

export default function MyPickleCard({ pickleData }: MyPickleCardProps) {
  console.log(pickleData);
  // format
  const dateFormat = `
    ${pickleData?.when.startDate.month.toString().padStart(2, '0')}.
    ${pickleData?.when.startDate.day.toString().padStart(2, '0')}~
    ${pickleData?.when.finishDate.month.toString().padStart(2, '0')}.
    ${pickleData?.when.finishDate.day.toString().padStart(2, '0')}
  `

  const { handleOpen } = useBottomSheetModal(state => state);

  const handleClickReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOpen({ renderComponent: ReviewModal, pickleId: pickleData.id, pickleTitle: pickleData.title });
  };

  return (
    <S.Card>
      <S.CardInner to={`/pickle/${pickleData?.id}`} $picklestate={pickleData?.state}>
        <S.CardTitle>{pickleData?.title}</S.CardTitle>
        <S.CardContent>
          <S.Date>{dateFormat}</S.Date>
          <S.Address>{pickleData?.place}</S.Address>
        </S.CardContent>
        <S.CategoryBg $bgtype={pickleData?.category} />
      </S.CardInner>
      <S.ReviewBtn $isshow={pickleData?.state !== 'closed'} onClick={handleClickReview}>
        리뷰 쓰기
      </S.ReviewBtn>
    </S.Card>
  );
}

const S = {
  Card: styled.div`
    position: relative;
  `,
  CardInner: styled(Link)<{ $picklestate: pickleState }>`
    display: block;
    background: #f3f4f6;
    padding: 2.8rem 2.4rem 2rem;
    border-radius: 0.8rem;
    color: #181f29;
    position: relative;
    height: 14.3rem;
    ${({ $picklestate }) => {
      switch ($picklestate) {
        case 'progress':
          return css`
            border: 1px solid #5dc26d;
            background: #f5f9f8;
          `;
        case 'closed':
          return css`
            opacity: 0.3;
          `;
      }
    }}
  `,
  CardTitle: styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.8rem;
  `,
  CardContent: styled.div``,
  Date: styled.p`
    font-size: 1.6rem;
    margin-bottom: 0.6rem;
  `,
  Address: styled.p`
    font-size: 1.4rem;
    color: #8b8d94;
  `,
  CategoryBg: styled.div<{ $bgtype: CategoryType }>`
    width: 9.1rem;
    aspect-ratio: 1/1;
    background-image: ${({ $bgtype }) => {
      switch ($bgtype) {
        case '운동':
          return `url('/icons/exercise.svg')`;

        case '취미':
          return `url('/icons/hobbies.svg')`;

        case '스터디':
          return `url('/icons/study.svg')`;
      }
    }};
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 2.6rem;
    right: 2.6rem;
  `,
  ReviewBtn: styled.button<{ $isshow: boolean }>`
    ${({ $isshow }) =>
      $isshow &&
      css`
        display: none;
      `}
    padding: 0.7rem 1.1rem;
    border-radius: 4px;
    font-size: 1.4rem;
    border: 1px solid #48b359;
    color: #48b359;
    background-color: #fff;
    transform: translateZ(0);
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
  `,
};
