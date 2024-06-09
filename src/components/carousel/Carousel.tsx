import fistStudyImg from '@/assets/images/study-1.jpg';
import secondStudyImg from '@/assets/images/study-2.jpg';
import fistExerciseImg from '@/assets/images/exercise-1.jpg';

import CarouselImg from './CarouselImg';
import { useState } from 'react';
import styled from '@emotion/styled';

const CAROUSEL_IMG_LIST = [
  {
    id: '1',
    img: fistStudyImg,
    content: '지금 제일 핫한\n피클 타임을\n찾아보세요!',
    semiContent: '친구와 함께\n책을 읽고 싶다면?',
  },
  {
    id: '2',
    img: secondStudyImg,
    content: '토론이 필요할 때도\n스터디를 찾으세요!',
    semiContent: '같은 목표로 같이 공부해요',
  },
  { id: '3', img: fistExerciseImg, content: '친구와 함께 뛰어요!', semiContent: '에너지를 올릴 수 있는 좋은 방법' },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? CAROUSEL_IMG_LIST.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === CAROUSEL_IMG_LIST.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <S.CarouselContainer className="carousel-container">
      <S.CarouselButton onClick={handlePrev} position="left">
        <img src="/icons/leftArrow.svg" alt="Previous" />
      </S.CarouselButton>

      <CarouselImg
        id={CAROUSEL_IMG_LIST[currentIndex].id}
        key={CAROUSEL_IMG_LIST[currentIndex].id}
        img={CAROUSEL_IMG_LIST[currentIndex].img}
        content={CAROUSEL_IMG_LIST[currentIndex].content}
        semiContent={CAROUSEL_IMG_LIST[currentIndex].semiContent}
      />

      <S.CarouselButton onClick={handleNext} position="right">
        <img src="/icons/rightArrow.svg" alt="Next" />
      </S.CarouselButton>
    </S.CarouselContainer>
  );
}

const S = {
  CarouselContainer: styled.div`
    position: relative;
    width: 100%;
    height: 26.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  CarouselButton: styled.button<{ position: 'left' | 'right' }>`
    position: absolute;
    top: 50%;
    width: 3rem;
    height: 3rem;
    transform: translateY(-50%);
    ${props => (props.position === 'left' ? 'left: 0.5rem;' : 'right: 0.5rem;')}
    background: none;
    border: none;
    cursor: pointer;
    z-index: 10;

    img {
      width: 2rem;
      height: 2rem;
    }
  `,
};
