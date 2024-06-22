import { useState } from 'react';
import styled from '@emotion/styled';

import Rating from '@/components/my-page/review/Rating';
import EmptyDataMessage from '@/components/common/EmptyDataMessage';
import { MyDynamicTemplate } from '@/styles/commonStyles';
import { useMyReviews } from '@/hooks/query/pickles';
import { ReviewData } from '@/apis/types/pickles.type';
import { formatYYMMDD } from '@/utils/formatData';

export default function ReviewList() {
  const [checkedReviews, setCheckedReviews] = useState<string[]>([]);

  const { data } = useMyReviews();
  const myReviewData = data?.data.data || [];

  const handleChecked = (id: string) => {
    if (checkedReviews.includes(id)) setCheckedReviews(checkedReviews.filter(item => item !== id));
    else setCheckedReviews([...checkedReviews, id]);
  };

  return (
    <MyDynamicTemplate>
      <h2>작성한 리뷰</h2>
      <h1>{myReviewData.length || 0} 개</h1>
      {myReviewData.length > 0 ? (
        <>
          <S.Delete $isChecked={checkedReviews.length > 0}>삭제하기</S.Delete>
          {myReviewData.map((review: ReviewData) => (
            <S.Review key={review.pickleId}>
              <S.Image src={review.pickleImageUrl} alt="피클 이미지" />
              <S.TextInfoBox>
                <S.CheckBox
                  onClick={() => handleChecked(review.pickleId)}
                  src={checkedReviews.includes(review.pickleId) ? '/icons/filledCheck.svg' : '/icons/emptyCheck.svg'}
                  alt="체크박스"
                />
                <span className="writing-date">{formatYYMMDD(review.date)} 작성</span>
                <span className="pickle-title">{review.pickleTitle}</span>
                <Rating rating={review.stars} />
                <p>{review.content}</p>
              </S.TextInfoBox>
            </S.Review>
          ))}
        </>
      ) : (
        <EmptyDataMessage>작성된 리뷰가 없어요!</EmptyDataMessage>
      )}
    </MyDynamicTemplate>
  );
}

const S = {
  Review: styled.div`
    display: flex;
    gap: 1.7rem;
    padding: 1.5rem 0 4rem;
    border-bottom: ${({ theme }) => theme.border};
  `,

  Image: styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 1.5rem;
    object-fit: cover;
  `,

  Delete: styled.div<{ $isChecked: boolean }>`
    text-align: end;
    color: ${({ theme, $isChecked }) => ($isChecked ? theme.color.accent2 : theme.color.sub)};
    ${({ theme }) => theme.typography.body1};
    cursor: pointer;
  `,

  TextInfoBox: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;

    & .writing-date {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};
    }

    & .pickle-title {
      ${({ theme }) => theme.typography.subTitle3};
    }

    p {
      ${({ theme }) => theme.typography.body1};
    }
  `,

  CheckBox: styled.img`
    position: absolute;
    top: 0;
    right: 0.4rem;
    cursor: pointer;
  `,
};
