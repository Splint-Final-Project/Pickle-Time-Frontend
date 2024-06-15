import styled from '@emotion/styled';
import StarIcon from '@/assets/icons/StarIcon';

/**
 * 별점 선택 컴포넌트
 */

export type Rating = number;
interface RatingProps {
  selectedRating: number;
  onStarHover: (rating: Rating) => void;
  onStarClick: (rating: Rating) => void;
}

export default function StarRating({ selectedRating, onStarHover, onStarClick }: RatingProps) {
  return (
    <S.Rating>
      {[1, 2, 3, 4, 5].map(rating => (
        <StarIcon
          key={rating}
          filled={rating <= selectedRating}
          onMouseEnter={() => onStarHover(rating)}
          onClick={() => onStarClick(rating)}
        />
      ))}
    </S.Rating>
  );
}

const S = {
  Rating: styled.div`
    display: flex;
    gap: 0.7rem;
  `,
};
