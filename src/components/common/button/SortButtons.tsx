import { useState } from 'react';
import styled from '@emotion/styled';

export default function SortButtons() {
  const sortTypeArray = [
    {
      title: '전체',
      func: () => {
        setSelectedSort('전체');
      },
    },
    {
      title: '인기순',
      func: () => {
        setSelectedSort('인기순');
      },
    },
    {
      title: '가격 낮은 순',
      func: () => {
        setSelectedSort('가격 낮은 순');
      },
    },
    {
      title: '가격 높은 순',
      func: () => {
        setSelectedSort('가격 높은 순');
      },
    },
  ];
  const [selectedSort, setSelectedSort] = useState(sortTypeArray[0].title);

  const handleSortButtonClick = (e: React.MouseEvent<HTMLButtonElement>, sortType: (typeof sortTypeArray)[number]) => {
    if (selectedSort === (e.currentTarget as HTMLButtonElement).value) return;
    setSelectedSort((e.currentTarget as HTMLButtonElement).value);
    sortType.func();
  };

  return (
    <S.Container>
      {sortTypeArray.map((sortType, idx) => (
        <S.Tab
          key={sortType.title}
          value={sortType.title}
          className={`${selectedSort === sortType.title ? 'selected' : ''}`}
          onClick={e => handleSortButtonClick(e, sortType)}
        >
          {sortType.title}
        </S.Tab>
      ))}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Tab: styled.button`
    font-size: 1.4rem;

    &.selected {
      font-weight: 700;
    }
  `,
};
