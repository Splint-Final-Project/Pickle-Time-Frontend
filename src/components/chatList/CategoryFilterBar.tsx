import { css } from '@emotion/react';
import styled from '@emotion/styled';

export type CategoryType = '전체' | '1:1 문의' | '진행 중'

interface CategoryFilterBarProps {
  setCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
  currentCategory: CategoryType;
  resetInputValue: React.Dispatch<React.SetStateAction<string>>;
}

interface TabListType {
  id: number;
  text: CategoryType;
  value: '' | '1:1 문의' | '진행 중';
}

const TAB_LIST: TabListType[] = [
  {
    id: 1,
    text: '전체',
    value: '',
  },
  {
    id: 2,
    text: '1:1 문의',
    value: '1:1 문의',
  },
  {
    id: 3,
    text: '진행 중',
    value: '진행 중',
  },
  // {
  //   id: 4,
  //   text: '스터디',
  //   value: '스터디',
  // },
];

export default function CategoryFilterBar({ setCategory, currentCategory, resetInputValue }: CategoryFilterBarProps) {
  const onClickCategory = (category: CategoryType) => {
    setCategory(category);
    resetInputValue('');
  };
  return (
    <S.Container>
      <S.Inner>
        {TAB_LIST.map(tab => (
          <S.Tab key={tab.id} onClick={() => onClickCategory(tab.text)} $isclick={tab.text === currentCategory}>
            <span>{tab.text}</span>
          </S.Tab>
        ))}
      </S.Inner>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2.8rem;
  `,
  Inner: styled.div`
    display: inline-flex;
    gap: 0.8rem;
  `,
  Tab: styled.button<{ $isclick: boolean }>`
    padding: 0.8rem 1.2rem;
    border-radius: 1.8rem;
    background: #f1f1f1;
    font-size: 1.4rem;
    color: #8b8d94;
    ${({ $isclick }) =>
      $isclick &&
      css`
        background: #181f29;
        color: #fff;
      `}
  `,
};
