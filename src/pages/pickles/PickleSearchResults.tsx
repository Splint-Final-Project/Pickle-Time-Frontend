import styled from '@emotion/styled';
import { useState } from 'react';
import { TwoColumnGridTemplate } from '@/styles/commonStyles';
import { SpecialPickleCard } from '@/components/pickleWholeList/PickleListCard';
import routes from '@/constants/routes';
import { Link, useSearchParams } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import client from '@/apis/axios';

// 피클 검색 결과 페이지 (작업중)
export default function PickleSearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchText = useDebounce(searchParams.get('text') || '', 400);

  async function fetchSearchResults() {
    try {
      const response = await client.get('/pickle/search', {
        params: {
          text: debouncedSearchText,
          sort: searchParams.get('sort'),
        },
      });
      setSearchResults(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (debouncedSearchText) fetchSearchResults();
    else setSearchResults([]);
  }, [debouncedSearchText, searchParams.get('sort'), searchParams.get('termOption')]);

  useEffect(() => {
    if (searchParams.get('sort') === null) {
      searchParams.set('sort', 'popular');
      setSearchParams(searchParams, { replace: true });
    }
  }, []);

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
            id="pickleSearch"
            autoFocus
            name="pickleSearch"
            placeholder="지역, 목표 등"
            value={searchParams.get('text') || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                searchParams.delete('text');
              } else {
                searchParams.set('text', e.target.value);
              }
              setSearchParams(searchParams, { replace: true });
            }}
          />
          <S.DeleteIconWrapper
            onClick={() => {
              searchParams.delete('text');
              setSearchParams(searchParams, { replace: true });
            }}
          >
            <img src="/icons/xCircle.svg" alt="clear" />
          </S.DeleteIconWrapper>
        </InputContainer>
      </S.HeaderWrapper>
      <S.GrayBox />

      <S.Content>
        <S.ContentTopSection>
          <S.PickleCount>
            피클 <S.PickleNumText>{searchResults.length}</S.PickleNumText>
          </S.PickleCount>
          <S.SortDropdown>
            <select
              value={searchParams.get('sort') || ('popular' as 'popular' | 'recent' | 'lowPrice' | 'highPrice')}
              onChange={e => {
                searchParams.set('sort', e.target.value);
                setSearchParams(searchParams, { replace: true });
              }}
            >
              <option value="popular">인기순</option>
              <option value="recent">최신순</option>
              <option value="lowPrice">가격 낮은 순</option>
              <option value="highPrice">가격 높은 순</option>
            </select>
          </S.SortDropdown>
        </S.ContentTopSection>
        {searchResults.length ? (
          <TwoColumnGridTemplate>
            {searchResults?.map((pickle: any) => <SpecialPickleCard key={pickle.id} pickleData={pickle} />)}
          </TwoColumnGridTemplate>
        ) : (
          <S.NoResults>
            {searchParams.get('text') === '' ? '검색어를 입력해 주세요.' : '검색 결과가 없습니다.'}
          </S.NoResults>
        )}
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
    min-height: 100%;
  `,
  HeaderWrapper: styled.div`
    position: relative;
    padding: 5rem 2.8rem 1.3rem;
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
    width: 1.5rem;
    height: 1.5rem;
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
    padding: 2rem 2.8rem 1.8rem;
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
      text-align: start;
    }
  `,
  NoResults: styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94));
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
};
