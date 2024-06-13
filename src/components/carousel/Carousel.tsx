import fistStudyImg from '@/assets/images/study-1.jpg';
import secondStudyImg from '@/assets/images/study-2.jpg';
import fistExerciseImg from '@/assets/images/exercise-1.jpg';

import CarouselImg from './CarouselImg';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

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
  {
    id: '4',
    img: fistStudyImg,
    content: '지금 제일 핫한\n피클 타임을\n찾아보세요!',
    semiContent: '친구와 함께\n책을 읽고 싶다면?',
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInitialize, setIsInitialize] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  useEffect(() => {
    if (!isMouseOver) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 6500);
      return () => clearInterval(interval);
    }
  }, [isMouseOver]);
  useEffect(() => {
    if (currentIndex === 3) {
      const initializeTimer = setTimeout(() => {
        setCurrentIndex(0);
        setIsInitialize(true);
        const resetTimer = setTimeout(() => {
          setIsInitialize(false);
        }, 2800);
        return () => {
          clearTimeout(resetTimer);
        };
      }, 1200);
      return () => {
        clearTimeout(initializeTimer);
      };
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  return (
    <S.CarouselContainer
      className="carousel-container"
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <S.CarouselButton onClick={handlePrev} position="left" disabled={currentIndex === 0 || currentIndex === 3}>
        <img src="/icons/leftArrow.svg" alt="Previous" />
      </S.CarouselButton>

      <S.CarouselWrapper currentIndex={currentIndex} isInitialize={isInitialize}>
        {CAROUSEL_IMG_LIST.map(item => (
          <CarouselImg
            id={item.id}
            key={item.id}
            img={item.img}
            content={item.content}
            semiContent={item.semiContent}
          />
        ))}
      </S.CarouselWrapper>

      <S.CarouselButton onClick={handleNext} position="right" disabled={currentIndex === 2}>
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
    align-items: center;
    justify-content: center;
    overflow: hidden;
  `,
  CarouselWrapper: styled.div<{ currentIndex: number, isInitialize: boolean }>`
    display: flex;
    ${({ currentIndex, isInitialize }) =>
      isInitialize
        ? css`
            transform: translateX(0);
          `
        : css`
            transition: transform 1s ease-in-out;
            transform: translateX(${-currentIndex * 100}%);
          `}
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
    &:disabled {
      display: none;
    }
  `,
};
