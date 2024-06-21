import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import StarRating, { Rating } from '@/components/my-page/review/StarRating';
import Button from '@/components/common/button/Button';
import PLACEHOLDER from '@/constants/PLACEHOLDER';
import { useCreateReviewMutation } from '@/hooks/query/pickles';
import { keyframes } from '@emotion/react';

/**
 * 리뷰작성 모달
 * - 1)별점 선택 2)텍스트 리뷰
 * - 별점 선택 시 선택한 별점과 리뷰작성할 수 있는 텍스트창 렌더(여기에서도 별점 수정가능)
 */

interface Props {
  pickleId: string;
  pickleTitle: string;
  handleClose: () => void;
}

export default function ReviewModal({ pickleId, pickleTitle, handleClose }: Props) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [isRatingSelected, setIsRatingSelected] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [showReviewInput, setShowReviewInput] = useState(false);
  console.log(pickleId);

  const { mutate: postReviewMutate } = useCreateReviewMutation(pickleId, () => handleClose());

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
    postReviewMutate({ stars: selectedRating, content: reviewText });
    setSelectedRating(0);
    setIsRatingSelected(false);
    setReviewText('');
  };

  useEffect(() => {
    if (isRatingSelected) {
      const timer = setTimeout(() => {
        setShowReviewInput(true);
      }, 380);
      return () => clearTimeout(timer);
    }
  }, [isRatingSelected]);

  return (
    <S.Container>
      {isRatingSelected && showReviewInput && (
        <S.FadeInContainer>
          <S.ReviewInputSection>
            <S.Title>리뷰쓰기</S.Title>
            <S.PickleName className="input-section">{pickleTitle}비비큐 황올 먹방 촬영</S.PickleName>
            <StarRating selectedRating={selectedRating} onStarHover={handleStarHover} onStarClick={handleStarClick} />
            <S.TextArea
              placeholder={PLACEHOLDER.REVIEW.WRITE}
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
            />
            <Button onClick={handleReviewSubmit}>작성 완료하기</Button>
          </S.ReviewInputSection>
        </S.FadeInContainer>
      )}
      {isRatingSelected && !showReviewInput && (
        <S.FadeOutContainer>
          <S.RatingChoiceSection>
            <S.Title>이 피클은 어떠셨나요?</S.Title>
            <S.PickleName className="rating-section">{pickleTitle}</S.PickleName>
            <StarRating selectedRating={selectedRating} onStarHover={handleStarHover} onStarClick={handleStarClick} />
          </S.RatingChoiceSection>
        </S.FadeOutContainer>
      )}
      {!isRatingSelected && (
        <S.RatingChoiceSection>
          <S.Title>이 피클은 어떠셨나요?</S.Title>
          <S.PickleName className="rating-section">{pickleTitle}</S.PickleName>
          <StarRating selectedRating={selectedRating} onStarHover={handleStarHover} onStarClick={handleStarClick} />
        </S.RatingChoiceSection>
      )}
    </S.Container>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    height: 200px;
  }
  100% {
    opacity: 0;
    height: 450px;
  }
`;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    /* max-height: 46rem; */
  `,

  ReviewInputSection: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 2rem 0 1.4rem;

    & .input-section {
      margin: 3.3rem 0 1.8rem;
    }
  `,

  RatingChoiceSection: styled.div`
    padding: 4rem 0 4rem;
    height: 200px;

    & .rating-section {
      margin: 0.5rem 0 4.5rem;
    }
  `,

  FadeInContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 450px;
    animation: ${fadeIn} 0.4s ease-in-out;
  `,

  FadeOutContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    animation: ${fadeOut} 0.4s ease-in-out;
  `,

  Title: styled.h2`
    color: ${({ theme }) => theme.color.basic};
    ${({ theme }) => theme.typography.subTitle1};
    font-weight: 600;
  `,

  PickleName: styled.div`
    color: ${({ theme }) => theme.color.sub};
    ${({ theme }) => theme.typography.subTitle3};
  `,

  TextArea: styled.textarea`
    width: 100%;
    height: 18rem;
    padding: 1.8rem 0;
    margin: 2.8rem 0;
    border: none;
    border-top: ${({ theme }) => theme.border};
    border-bottom: ${({ theme }) => theme.border};

    overflow-y: auto; //스크롤이 왜 안보일까요?
    font-size: 1.6rem;

    ::placeholder {
      color: ${({ theme }) => theme.color.inputText};
      ${({ theme }) => theme.typography.body1}
    }
  `,
};
