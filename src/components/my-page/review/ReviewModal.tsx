import { useState } from 'react';
import styled from '@emotion/styled';
import StarIcon from '@/assets/icons/StarIcon';

type Rating = number;

export default function ReviewModal() {
  const [selectedRating, setSelectedRating] = useState(0);
  const [isRatingSelected, setIsRatingSelected] = useState(false);

  // 호버시 별 차도록
  const handleStarHover = (rating: Rating) => {
    setSelectedRating(rating);
  };

  const handleStarClick = (rating: Rating) => {
    setSelectedRating(rating);
    setIsRatingSelected(true);
    console.log('별점은', rating);
  };

  return (
    <S.ContentContainer className="pickle">
      {isRatingSelected ? (
        <>
          <S.Title>리뷰쓰기</S.Title>
          <S.TopSection>
            <h3>🏃🏻‍♀️위워크 러닝크루</h3>
            <S.Rating>
              {[1, 2, 3, 4, 5].map(rating => (
                <StarIcon
                  key={rating}
                  filled={rating <= selectedRating}
                  onMouseEnter={() => handleStarHover(rating)}
                  onClick={() => handleStarClick(rating)}
                />
              ))}
            </S.Rating>
          </S.TopSection>
          <S.TextArea placeholder="리뷰를 작성해주세요..." />
        </>
      ) : (
        <>
          <img src="/icons/tmpRating.png" width="80" />
          <S.TextBox>
            <h2>이 피클은 어떠셨나요?</h2>
            <h3>🏃🏻‍♀️위워크 러닝크루</h3>
            <span>대신 파이낸셜 지하 1층 헬스장</span>
          </S.TextBox>
          <S.Rating>
            {[1, 2, 3, 4, 5].map(rating => (
              <StarIcon
                key={rating}
                filled={rating <= selectedRating}
                onMouseEnter={() => handleStarHover(rating)}
                onClick={() => handleStarClick(rating)}
              />
            ))}
          </S.Rating>
        </>
      )}
    </S.ContentContainer>
  );
}

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
    width: 80%;
    height: 10rem;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  `,

  Rating: styled.div``,
};
