import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
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
  const [indicatorStyle, setIndicatorStyle] = useState({ left: '0px', width: '0px' });
  const tabsRef = useRef<HTMLDivElement>(null);

  const sortTypeArray = HOME_PICK_SORT_TAB.map(title => ({
    title,
    func: () => setSelectedSort(title),
  }));

  const handleSortTabClick = (sortType: SortType, tabElement: HTMLButtonElement) => {
    if (selectedSort === sortType.title) return;
    setSelectedSort(sortType.title);
    sortType.func();

    const left = tabElement.offsetLeft;
    const width = tabElement.clientWidth;
    setIndicatorStyle({ left: `${left}px`, width: `${width}px` });
  };

  useEffect(() => {
    if (tabsRef.current) {
      const initialTab = tabsRef.current.querySelector('.selected') as HTMLButtonElement;
      if (initialTab) {
        const left = initialTab.offsetLeft;
        const width = initialTab.clientWidth;
        setIndicatorStyle({ left: `${left}px`, width: `${width}px` });
      }
    }
  }, [tabsRef.current]);

  return (
    <S.Container ref={tabsRef}>
      {sortTypeArray.map(sortType => (
        <S.Tab
          key={sortType.title}
          value={sortType.title}
          className={`${selectedSort === sortType.title ? 'selected' : ''}`}
          onClick={e => handleSortTabClick(sortType, e.currentTarget)}
        >
          {sortType.title}
        </S.Tab>
      ))}
      <S.Indicator style={indicatorStyle} />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    padding: 0 2.8rem;
    margin-left: -2.8rem;
    margin-right: -2.8rem;
    border-bottom: 1.5px solid #ddd;
  `,

  Tab: styled.button`
    font-size: 1.5rem;
    border: none;
    padding: 0 2.8rem 1.5rem;
    cursor: pointer;
    transition: all 0.3s;

    &.selected {
      font-weight: 700;
      color: ${({ theme }) => theme.color.secondary};
    }

    @media (max-width: 500px) {
      font-size: 1.2rem;
      padding: 0 1rem 1.5rem;
    }
  `,

  Indicator: styled.div`
    position: absolute;
    bottom: -2.5px;
    height: 3px;
    background: ${({ theme }) => theme.color.secondary};
    transition: all 0.3s ease-out;
  `,
};
