import styled from '@emotion/styled';

import SpecialPickleCard from '../picklecard/SpecialPickleCard';
import { useGetSpecialPickles } from '@/hooks/query/pickles';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';
import { css } from '@emotion/react';
const mockData = [
  {
    capacity: 50,
    cost: 15.99,
    participants: new Array(1).fill(3),
    deadLine: new Date('2024-06-30'),
    title: 'Classic Dill Pickle Workshop',
    where: 'New York, NY',
    id: '1',
  },
  {
    capacity: 30,
    cost: 12.5,
    deadLine: new Date('2024-07-15'),
    title: 'Spicy Pickle Making',
    where: 'Austin, TX',
    id: '2',
    participants: new Array(1).fill(3),
  },
  {
    capacity: 40,
    cost: 20.0,
    deadLine: new Date('2024-08-05'),
    title: 'Gourmet Pickling Techniques',
    where: 'San Francisco, CA',
    id: '3',
    participants: new Array(1).fill(3),
  },
  {
    capacity: 25,
    cost: 10.0,
    deadLine: new Date('2024-07-01'),
    title: 'Quick and Easy Pickles',
    where: 'Chicago, IL',
    id: '4',
    participants: new Array(1).fill(3),
  },
  {
    capacity: 35,
    cost: 18.75,
    deadLine: new Date('2024-09-12'),
    title: 'Fermented Pickle Class',
    id: '5',
    participants: new Array(1).fill(3),
  },
  {
    capacity: 60,
    cost: 25.0,
    deadLine: new Date('2024-06-25'),
    title: 'Pickling for Beginners',
    where: 'Miami, FL',
    id: '6',
    participants: new Array(1).fill(3),
  },
  {
    capacity: 20,
    cost: 14.99,
    deadLine: new Date('2024-07-20'),
    title: 'Artisanal Pickles Workshop',
    where: 'Portland, OR',
    id: '7',
    participants: new Array(1).fill(3),
  },
  {
    capacity: 45,
    cost: 22.5,
    deadLine: new Date('2024-08-25'),
    title: 'Pickling Masterclass',
    where: 'Seattle, WA',
    id: '8',
    participants: new Array(1).fill(3),
  },
  {
    capacity: 50,
    cost: 19.99,
    deadLine: new Date('2024-09-05'),
    title: 'Sweet and Sour Pickles',
    where: 'Denver, CO',
    id: '9',
    participants: new Array(1).fill(3),
  },
  {
    capacity: 30,
    cost: 11.0,
    deadLine: new Date('2024-07-10'),
    title: 'Homemade Pickles 101',
    id: '10',
    participants: new Array(1).fill(3),
  },
];
interface PickleCardListProps {
  category: 'hotTime' | 'popular';
}

const PICKLECARD_WIDTH = 144;

//TODO : 피클 API연결하기(지금은 목데이터 사용중 => 데이터가 없어서 ㅠㅠ)
export default function PickleCardList({ category }: PickleCardListProps) {
  // const data = useGetSpecialPickles(category);
  // const { data } = useSuspenseQuery({
  //   queryKey: ['pickles'],
  //   queryFn: async () => {
  //     const { data } = await axios.get('http://localhost:8080/api/v1/pickle');
  //     return data;
  //   },
  //   select: data => data.data,
  // });
  // console.log(data);
  // console.log(data.data);
  const [moveSliderValue, setMoveSliderValue] = useState(0);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const ListRef = useRef<HTMLUListElement>(null);
  const ListContainerRef = useRef<HTMLDivElement>(null);
  const onMouseInEvent = () => {
    setIsMouseIn(true);
  };
  const onMouseLeaveEvent = () => {
    setIsMouseIn(false);
  };
  const handleLeftBtn = () => {
    if (moveSliderValue === 0) {
      return;
    }
    setMoveSliderValue(prev => prev - 1);
  };
  const handleRightBtn = () => {
    if (!ListRef.current || !ListContainerRef.current) return;

    if (moveSliderValue * PICKLECARD_WIDTH > ListRef?.current.offsetWidth - ListContainerRef?.current.offsetWidth) {
      return;
    }
    setMoveSliderValue(prev => prev + 1);
  };
  return (
    <S.Container ref={ListContainerRef}>
      <S.ListViewBox>
        <S.ListInner onMouseOver={onMouseInEvent} onMouseLeave={onMouseLeaveEvent}>
          <S.List $transLateX={moveSliderValue} ref={ListRef}>
            {mockData.map((pickle: any) => (
              <li key={pickle.id}>
                <SpecialPickleCard pickleData={pickle} />
              </li>
            ))}
          </S.List>
        </S.ListInner>
      </S.ListViewBox>
      <S.SliderControlBtn onClick={handleLeftBtn} $isShow={isMouseIn} $position="left" onMouseOver={onMouseInEvent}>
        왼쪽
      </S.SliderControlBtn>
      <S.SliderControlBtn onClick={handleRightBtn} $isShow={isMouseIn} $position="right" onMouseOver={onMouseInEvent}>
        오른쪽
      </S.SliderControlBtn>
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
    transform: ${({ $transLateX }) => `translateX(-${$transLateX * 144}px)`};
  `,
  SliderControlBtn: styled.button<{ $position: 'right' | 'left'; $isShow: boolean }>`
    display: ${({ $isShow }) => ($isShow ? 'inline-block' : 'none')};
    width: 5rem;
    height: 5rem;
    background-color: red;
    z-index: 500;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${({ $position }) => {
      if ($position === 'right') {
        return css`
          right: -2.5rem;
        `;
      } else {
        return css`
          left: -2.5rem;
        `;
      }
    }}
  `,
  Container: styled.div`
    position: relative;
  `,
};
