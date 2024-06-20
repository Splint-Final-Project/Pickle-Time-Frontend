import styled from '@emotion/styled';
import { useState } from 'react';
import { TwoColumnGridTemplate } from '@/styles/commonStyles';
import PickleListCard from '@/components/pickleWholeList/PickleListCard';
import PickleCardListMockData from '@/mocks/pickleCardListMockData';
import routes from '@/constants/routes';
import { Link } from 'react-router-dom';

// 피클 검색 결과 페이지 (작업중)
export default function PickleSearchResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('인기순');
  const [termOption, setTermOption] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearInput = () => {
    setSearchTerm('');
  };

  return (
    <S.Container>
      <S.HeaderWrapper>
        <S.BackButtonWrapper>
          <S.BackButton to={routes.home}>
            <S.Icon src="/icons/backButton.svg" alt="Back Button" />
          </S.BackButton>
        </S.BackButtonWrapper>

        <InputContainer>
          <S.SearchIconWrapper>
            <img src="/icons/search.svg" alt="search" />
          </S.SearchIconWrapper>
          <InputField
            type="text"
            id="searchInputField"
            name=""
            placeholder=""
            value={searchTerm}
            onChange={handleInputChange}
          />
          <S.DeleteIconWrapper onClick={clearInput}>
            <img src="/icons/xCircle.svg" alt="clear" />
          </S.DeleteIconWrapper>
        </InputContainer>
      </S.HeaderWrapper>
      <S.GrayBox />

      <S.Content>
        <S.ContentTopSection>
          <S.PickleCount>
            피클 <S.PickleNumText>6</S.PickleNumText>
          </S.PickleCount>
          <S.SortDropdown>
            <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
              <option value="인기순">인기순</option>
              <option value="최신순">최신순</option>
              <option value="가격 낮은 순">가격 낮은 순</option>
              <option value="가격 높은 순">가격 높은 순</option>
            </select>
          </S.SortDropdown>
        </S.ContentTopSection>
        <S.TermDropdown>
          <select value={termOption} onChange={e => setTermOption(e.target.value)}>
            <option value="">기간</option>
            <option value="1개월 이상">1개월 이상</option>
            <option value="3개월 이상">3개월 이상</option>
            <option value="6개월 이상">6개월 이상</option>
          </select>
        </S.TermDropdown>
        <TwoColumnGridTemplate>
          {/* 카드 검색 데이터에 맞는 카드 나열 */}
          {/* <PickleListCard category="popular" /> */}
          <PickleCardListMockData />
        </TwoColumnGridTemplate>
      </S.Content>
    </S.Container>
  );
}

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 32px;
`;

const InputField = styled.input`
  width: 100%;
  height: 3rem;
  border: none;
  border-bottom: 1px solid #d0d0d0;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0rem 2rem 0.8rem 2.5rem;

  &:focus {
    border-bottom-color: #045905;
  }
  ::placeholder {
    color: var(--Input-Text, #bababa);
  }
`;

const S = {
  Section: styled.section``,
  Container: styled.div`
    height: 100dvh;
  `,
  HeaderWrapper: styled.div`
    position: relative;
    padding: 10rem 2.9rem 1.3rem;
  `,
  BackButtonWrapper: styled.div`
    margin-left: -1rem;
  `,
  BackButton: styled(Link)`
    padding: 0.5rem 0.5rem 0.5rem 0.9rem;
  `,
  SearchBarWrapper: styled.div`
    display: flex;
    margin-top: 4.1rem;
    height: 3rem;
    padding-bottom: 8px;
    border-bottom: 1px solid #d0d0d0;
  `,
  SearchIconWrapper: styled.div`
    display: flex;
    position: absolute;
    top: 3px;
    align-items: center;
    width: 3rem;
  `,
  DeleteIconWrapper: styled.div`
    display: flex;
    position: absolute;
    top: 3px;
    right: 3px;
    align-items: center;
    cursor: pointer;
  `,
  Icon: styled.img`
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  `,
  GrayBox: styled.div`
    background-color: #f6f6f6;
    width: 100%;
    height: 12px;
  `,

  Content: styled.div`
    background: #fff;
    min-height: calc(100% - 30rem);
    padding: 2rem 2.9rem 1.8rem;
  `,
  ContentTopSection: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  PickleCount: styled.div``,
  PickleNumText: styled.span`
    color: var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94));
  `,
  SortDropdown: styled.div`
    display: flex;
    align-items: center;

    select {
      padding: 0.5rem;
      border: 0px;
      border-radius: 4px;
      background-color: #fff;
      font-size: 14px;
      color: var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94));
      text-align: end;
    }
  `,
  TermDropdown: styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;

    select {
      padding: 0.8rem;
      padding-left: 1rem;
      border: 1px solid #d0d0d0;
      border-radius: 20px;
      background-color: #fff;
      font-size: 14px;
      font-weight: 500;
      background: url('/icons/dropdown.svg') no-repeat 87% 50%/10px auto;
      color: var(--Basic, #181f29);
      -webkit-appearance: none; /* for chrome */
      -moz-appearance: none; /*for firefox*/
      appearance: none;
    }
  `,
};
