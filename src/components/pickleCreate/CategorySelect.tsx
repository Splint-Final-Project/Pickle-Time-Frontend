import CategoryElement from './CategoryElement';
import ExerciseCategoryImg from '@/assets/images/categoryElement-Exercise.svg';
import HobbyCategoryImg from '@/assets/images/categoryElement-Hobby.svg';
import StudyCategoryImg from '@/assets/images/categoryElement-Study.svg';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const CATEGORY_LIST = [
  { id: 1, title: '운동', content: '러닝, 자전거 등', src: ExerciseCategoryImg },
  { id: 2, title: '취미', content: '쿠킹, 독서 등', src: HobbyCategoryImg },
  { id: 3, title: '스터디', content: '자격증, 전공 공부 등', src: StudyCategoryImg },
];

export default function CategorySelect({ hook }: { hook: any }) {
  const { category, setCategory } = hook();
  const [selectedId, SetSelectedId] = useState<number | null>(null);

  const handleClick = (clickedId: number) => {
    SetSelectedId(clickedId);
    setCategory(CATEGORY_LIST[clickedId - 1].title);
  };

  useEffect(() => {
    if (category) {
      console.log(category);
      const selectedCategory = CATEGORY_LIST.find(item => item.title === category);
      SetSelectedId(selectedCategory?.id || null);
    }
  }, [category]);

  return (
    <S.Container>
      <S.Text>피클의 카테고리를 선택해 주세요</S.Text>
      {CATEGORY_LIST.map(category => (
        <CategoryElement
          key={category.id}
          id={category.id}
          title={category.title}
          content={category.content}
          src={category.src}
          selectedId={selectedId}
          onClick={handleClick}
        />
      ))}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    /*  */
    gap: 2.3rem;
  `,

  Text: styled.span`
    color: #292929;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,
};
