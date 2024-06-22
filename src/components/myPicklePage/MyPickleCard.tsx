import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { pickleState } from './PickleStateFilterBar';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import ReviewModal from '../my-page/review/ReviewModal';

type Time = {
  times: Date[];
  startDate: any;
  finishDate: any;
  startTime: any;
  finishTime: any;
  selectedDays: any;
};

type CategoryType = '운동' | '취미' | '스터디';

export type PickleDataType = {
  title: string;
  duration: string;
  place: string;
  imgUrl: string;
  category: CategoryType;
  state: pickleState;
  id: string;
  when: Time;
  status: 'done' | 'cancelled' | 'progress' | 'pending';
  review: boolean;
};

interface MyPickleCardProps {
  pickleData: PickleDataType;
}

export default function MyPickleCard({ pickleData }: MyPickleCardProps) {
  const dateFormat = `
    ${pickleData?.when.startDate.month.toString().padStart(2, '0')}.
    ${pickleData?.when.startDate.day.toString().padStart(2, '0')}~
    ${pickleData?.when.finishDate.month.toString().padStart(2, '0')}.
    ${pickleData?.when.finishDate.day.toString().padStart(2, '0')}
  `;

  const { handleOpen } = useBottomSheetModal(state => state);

  const navigate = useNavigate();

  const handleClickReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOpen({ renderComponent: ReviewModal, pickleId: pickleData.id, pickleTitle: pickleData.title });
  };

  return (
    <S.Card>
      <S.CardInner
        disabled={pickleData.status === 'cancelled'}
        onClick={() => navigate(`/pickle/${pickleData.id}`)}
        $status={pickleData.status}
      >
        <S.CardTitle>{pickleData.title}</S.CardTitle>
        <S.CardContent>
          {pickleData.status === 'cancelled' ? (
            <S.CardTitle>인원 미달로 자동취소/환불되었습니다.</S.CardTitle>
          ) : (
            <>
              <S.Date>{dateFormat}</S.Date>
              <S.Address>{pickleData.place}</S.Address>
            </>
          )}
        </S.CardContent>
        <S.CategoryBg src={pickleData.imgUrl} alt="pickle image" />
      </S.CardInner>
      {pickleData.status === 'done' &&
        (pickleData.review ? (
          <S.ReviewBtn $done={true} onClick={() => navigate('/mypage?tab=review')}>
            리뷰 완료
          </S.ReviewBtn>
        ) : (
          <S.ReviewBtn onClick={handleClickReview}>리뷰 쓰기</S.ReviewBtn>
        ))}
    </S.Card>
  );
}

const S = {
  Card: styled.div`
    position: relative;
  `,
  CardInner: styled.button<{ $status: 'done' | 'cancelled' | 'progress' | 'pending' }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    background: #f3f4f6;
    padding: 2.8rem 2.4rem 2rem;
    border-radius: 0.8rem;
    color: #181f29;
    position: relative;
    height: 14.3rem;
    ${({ $status }) =>
      $status === 'done' ||
      ($status === 'cancelled' &&
        css`
          opacity: 0.4;
        `)}
  `,
  CardTitle: styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.8rem;
  `,
  CardContent: styled.div``,
  Date: styled.p`
    text-align: left;
    font-size: 1.6rem;
    margin-bottom: 0.6rem;
  `,
  Address: styled.p`
    text-align: left;
    font-size: 1.4rem;
    color: #8b8d94;
  `,
  CategoryBg: styled.img`
    width: 10rem;
    height: 10rem;
    border-radius: 0.8rem;
    object-fit: cover;
    position: absolute;
    top: 2.15rem;
    right: 2.15rem;
  `,
  ReviewBtn: styled.button<{ $done?: boolean }>`
    padding: 0.7rem 1.1rem;
    border-radius: 4px;
    font-size: 1.4rem;
    border: 1px solid #48b359;
    color: #48b359;
    background-color: #fff;
    transform: translateZ(0);
    position: absolute;
    bottom: 1.5rem;
    right: 2rem;
    ${({ $done = false }) => {
      return (
        $done &&
        css`
          color: #045905;
          border: 1px solid #045905;
        `
      );
    }}
  `,
};
