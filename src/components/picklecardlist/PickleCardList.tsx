import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';

import SpecialPickleCard from '../picklecard/SpecialPickleCard';
import { useGetSpecialPickles } from '@/hooks/query/pickles';

import leftArrow from '/icons/leftBlackArrow.svg';
import rightArrow from '/icons/rightBlackArrow.svg';
import PickleCardMockData from '@/mocks/pickleCardMockData';

interface PickleCardListProps {
  category: 'hotTime' | 'popular';
}

const SLIDER_MOVE_VALUE = 288;

//TODO : 데이터 없을시 보여줄 ui 디자인하기
export default function PickleCardList({ category }: PickleCardListProps) {
  const { data } = useGetSpecialPickles(category);

  const [moveSliderValue, setMoveSliderValue] = useState(0);
  const [isMouseInLeft, setIsMouseInLeft] = useState(false);
  const [isMouseInRight, setIsMouseInRight] = useState(false);
  const ListRef = useRef<HTMLUListElement>(null);
  const ListContainerRef = useRef<HTMLDivElement>(null);
  const [existData, setExistData] = useState<boolean>(false);

  useEffect(() => {
    if (!data) {
      setExistData(false);
    } else {
      setExistData(true);
    }
  }, [data]);

  const handleLeftBtn = () => {
    if (moveSliderValue === 0) {
      return;
    }
    setMoveSliderValue(prev => prev - 1);
  };
  const handleRightBtn = () => {
    if (!ListRef.current || !ListContainerRef.current) return;

    if (moveSliderValue * SLIDER_MOVE_VALUE > ListRef.current.offsetWidth - ListContainerRef.current.offsetWidth) {
      return;
    }
    setMoveSliderValue(prev => prev + 1);
  };

  return (
    <S.Container ref={ListContainerRef}>
      <S.ListViewBox>
        <S.ListInner>
          <S.List $transLateX={moveSliderValue} ref={ListRef}>
            {/* 데이터 사용 시 아래 조건문 주석 제거 */}
            {data?.length ? (
              data.map((pickle: any) => (
                <li key={pickle.id}>
                  <SpecialPickleCard pickleData={pickle} />
                </li>
              ))
            ) : (
              <h1>회원님의 활동 지역 내에 모집중인 피클이 없습니다. [TODO: 이거 디자인]</h1>
            )}
            {/* 목데이터 */}
            {/* <PickleCardMockData /> */}
          </S.List>
        </S.ListInner>
      </S.ListViewBox>
      <S.HoverAreaLeft onMouseEnter={() => setIsMouseInLeft(true)} onMouseLeave={() => setIsMouseInLeft(false)}>
        <S.SliderControlBtn onClick={handleLeftBtn} $isShow={isMouseInLeft && existData}>
          <img src={leftArrow} alt="Left Arrow" />
        </S.SliderControlBtn>
      </S.HoverAreaLeft>
      <S.HoverAreaRight onMouseEnter={() => setIsMouseInRight(true)} onMouseLeave={() => setIsMouseInRight(false)}>
        <S.SliderControlBtn onClick={handleRightBtn} $isShow={isMouseInRight && existData}>
          <img src={rightArrow} alt="Right Arrow" />
        </S.SliderControlBtn>
      </S.HoverAreaRight>
    </S.Container>
  );
}

const S = {
  ListViewBox: styled.div`
    margin-left: -2.8rem;
    margin-right: -2.8rem;
    overflow-x: scroll;
    padding: 0.5rem 0;
    scrollbar-width: none;
    position: relative;
  `,
  ListInner: styled.div`
    display: inline-block;
    padding-left: 2.8rem;
    padding-right: 2.8rem;
  `,
  List: styled.ul<{ $transLateX: number }>`
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
    transition: 0.5s;
    transform: ${({ $transLateX }) => `translateX(-${$transLateX * SLIDER_MOVE_VALUE}px)`};
  `,
  HoverAreaLeft: styled.div`
    position: absolute;
    top: 0;
    left: -3.5rem;
    bottom: 0;
    width: 5rem;
    background-color: transparent;
  `,
  HoverAreaRight: styled.div`
    position: absolute;
    top: 0;
    right: -3.5rem;
    bottom: 0;
    width: 5rem;
    background-color: transparent;
  `,
  SliderControlBtn: styled.button<{ $isShow: boolean }>`
    display: ${({ $isShow }) => ($isShow ? 'inline-block' : 'none')};
    width: 5rem;
    height: 5rem;
    z-index: 500;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 2rem;
      height: 2rem;
    }
  `,
  Container: styled.div`
    position: relative;
  `,
};
