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

// 홈화면에서 보여주는 피클 카드 리스트
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
              <S.CardWrapper>
                <S.CardLayer>
                  <S.NoPicklesImg src="/images/noPickles.png" />
                </S.CardLayer>
              </S.CardWrapper>
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
  Container: styled.div`
    position: relative;
  `,
  CardWrapper: styled.div`
    display: flex;
  `,
  CardLayer: styled.div`
    display: block;
    margin: auto;

    width: 29.6rem;
    height: 16.5rem;
    border-radius: 0.4rem;
    background: #fff;
    padding: 1.2rem 1.2rem 1.2rem 2.2rem;
    color: #161616;
    position: relative;
    box-shadow: 0px 1px 2.8px 0px rgba(0, 0, 0, 0.25);
    transition: 0.5s;
  `,
  NoPicklesImg: styled.img`
    height: 100%;
  `,
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
    left: -2.8rem;
    bottom: 0;
    width: 3rem;
    background-color: transparent;
  `,
  HoverAreaRight: styled.div`
    position: absolute;
    top: 0;
    right: -2.8rem;
    bottom: 0;
    width: 3rem;
    background-color: transparent;
  `,
  SliderControlBtn: styled.button<{ $isShow: boolean }>`
    display: ${({ $isShow }) => ($isShow ? 'inline-block' : 'none')};
    width: 3rem;
    height: 3rem;
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
};
