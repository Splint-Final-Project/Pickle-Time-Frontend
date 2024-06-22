import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import PageNationNextArrowIcon from '@/assets/icons/PagenationNextArrow';
import PageNationPrevArrowIcon from '@/assets/icons/PagenationPrevArrow';

interface PagenationBarProps {
  totalDataCount: number;
}

const DEFAULT_PAGE_GROUP_SIZE = 3;

export default function PagenationBar({ totalDataCount }: PagenationBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageNum = Number(searchParams.get('page')) || 1;
  const pageArrayLength =
    Math.ceil(totalDataCount / DEFAULT_PAGE_GROUP_SIZE) === Math.ceil(currentPageNum / DEFAULT_PAGE_GROUP_SIZE) &&
    totalDataCount % DEFAULT_PAGE_GROUP_SIZE !== 0
      ? totalDataCount % DEFAULT_PAGE_GROUP_SIZE
      : DEFAULT_PAGE_GROUP_SIZE;

  const handlePrevBtn = () => {
    searchParams.set('page', `${currentPageNum - 1}`);
    setSearchParams(searchParams);
  };

  const handleNextBtn = () => {
    searchParams.set('page', `${currentPageNum + 1}`);
    setSearchParams(searchParams);
  };

  const handlePageBtn = (pagNum: number) => {
    searchParams.set('page', `${pagNum}`);
    setSearchParams(searchParams);
  };

  const renderPageButton = (num: number) => {
    if (num === currentPageNum) {
      return <S.ActivePage key={num}>{num}</S.ActivePage>;
    }
    return (
      <S.PageButton onClick={() => handlePageBtn(num)} key={num}>
        {num}
      </S.PageButton>
    );
  };
  return (
    <S.Container>
      <S.PageNationHandleButton onClick={handlePrevBtn} disabled={currentPageNum === 1}>
        <span>
          <PageNationPrevArrowIcon isActive={currentPageNum !== 1} />
        </span>
      </S.PageNationHandleButton>
      <S.PageWrap>
        {Array.from(
          { length: pageArrayLength },
          (_, i) => (Math.ceil(currentPageNum / DEFAULT_PAGE_GROUP_SIZE) - 1) * DEFAULT_PAGE_GROUP_SIZE + (i + 1),
        ).map(renderPageButton)}
      </S.PageWrap>
      <S.PageNationHandleButton onClick={handleNextBtn} disabled={currentPageNum === totalDataCount}>
        <span>
          <PageNationNextArrowIcon isActive={currentPageNum !== totalDataCount} />
        </span>
      </S.PageNationHandleButton>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    gap: 2rem;
    font-size: 1.4rem;
    justify-content: flex-end;
  `,
  PageNationHandleButton: styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:disabled {
      cursor: auto;
    }
  `,
  PageWrap: styled.div`
    display: inline-flex;
    gap: 2rem;
  `,
  PageButton: styled.button`
    color: #76787f;
    font-weight: 400;
  `,
  ActivePage: styled.span`
    color: #181f29;
    font-weight: 600;
  `,
};
