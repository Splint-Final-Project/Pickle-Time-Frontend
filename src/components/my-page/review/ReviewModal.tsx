import { useState } from 'react';
import styled from '@emotion/styled';
import StarRating, { Rating } from '@/components/my-page/review/StarRating';
import PLACEHOLDER from '@/constants/PLACEHOLDER';

interface Props {
  handleClose: () => void;
}

export default function ReviewModal({ handleClose }: Props) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [isRatingSelected, setIsRatingSelected] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const handleStarHover = (rating: Rating) => {
    if (!isRatingSelected) {
      setSelectedRating(rating);
    }
  };

  const handleStarClick = (rating: Rating) => {
    setSelectedRating(rating);
    setIsRatingSelected(true);
  };

  const handleReviewSubmit = () => {
    //ToDo 서버로 보내는 mutation로직 추가
    console.log({ rating: selectedRating, text: reviewText });
    setSelectedRating(0);
    setIsRatingSelected(false);
    setReviewText('');
    handleClose();
  };

  return (
    <S.ContentContainer className="pickle">
      {isRatingSelected ? (
        <>
          <S.Title>리뷰쓰기</S.Title>
          <S.TopSection>
            <h3>🏃🏻‍♀️위워크 러닝크루</h3>
            <StarRating selectedRating={selectedRating} onStarHover={handleStarHover} onStarClick={handleStarClick} />
          </S.TopSection>
          <S.TextArea
            placeholder={PLACEHOLDER.REVIEW.WRITE}
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />
          <S.Button onClick={handleReviewSubmit}>작성완료</S.Button>
        </>
      ) : (
        <>
          <img src="/icons/tmpRating.png" width="80" />
          <S.TextBox>
            <h2>이 피클은 어떠셨나요?</h2>
            <h3>🏃🏻‍♀️위워크 러닝크루</h3>
            <span>대신 파이낸셜 지하 1층 헬스장</span>
          </S.TextBox>
          <StarRating selectedRating={selectedRating} onStarHover={handleStarHover} onStarClick={handleStarClick} />
        </>
      )}
    </S.ContentContainer>
  );
}

//Todo 디자인 나오면 세세한 스타일 수정예정
const S = {
  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;

    min-height: 40rem;
    padding: 2rem 0;
  `,

  Title: styled.h2`
    ${({ theme }) => theme.typography.header}
    font-weight: 700;
  `,

  TopSection: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    margin-top: 1rem;

    h3 {
      ${({ theme }) => theme.typography.subTitle1}
    }
  `,

  TextBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h2 {
      ${({ theme }) => theme.typography.header}
      font-weight: 700;
    }

    h3 {
      ${({ theme }) => theme.typography.subTitle1}
    }

    span {
      ${({ theme }) => theme.typography.body2}
    }
  `,

  TextArea: styled.textarea`
    width: 90%;
    height: 18rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.4rem;
    overflow-y: auto; //스크롤이 왜 안보일까요?
    font-size: 1.6rem;

    ::placeholder {
      ${({ theme }) => theme.typography.body1}
    }
  `,

  Button: styled.button`
    width: 90%;
    border: 1px solid #ccc;
    border-radius: 0.8rem;
    padding: 1.5rem;
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
    ${({ theme }) => theme.typography.body1};
  `,
};
