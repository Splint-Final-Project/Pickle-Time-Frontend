import { useState } from 'react';
import styled from '@emotion/styled';
import { HOME_PICK_SORT_TAB } from '@/constants/BUTTON';

/**
 * SortButtons - 홈 피클 목록 정렬 탭 컴포넌트
 * - 전체 / 인기 순 / 가격 낮은 순 / 가격 높은 순
 * - 추후 공통 정렬탭으로 바뀔 수 있음
 */

interface SortType {
  title: string;
  func: () => void;
}

export default function SortButtons() {
  const [selectedSort, setSelectedSort] = useState(HOME_PICK_SORT_TAB[0]);

  const sortTypeArray = HOME_PICK_SORT_TAB.map(title => ({
    title,
    func: () => setSelectedSort(title),
  }));

  const handleSortTabClick = (sortType: SortType) => {
    if (selectedSort === sortType.title) return;
    setSelectedSort(sortType.title);
    sortType.func();
  };

  return (
    <S.Container>
      {sortTypeArray.map(sortType => (
        <S.Tab
          key={sortType.title}
          value={sortType.title}
          className={`${selectedSort === sortType.title ? 'selected' : ''}`}
          onClick={() => handleSortTabClick(sortType)}
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
