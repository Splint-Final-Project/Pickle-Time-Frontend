import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import client from '@/apis/axios';
import { useDebounce } from '@uidotdev/usehooks';

import { SpecialPickleCard } from '@/components/pickleWholeList/PickleListCard';
import EmptyDataMessage from '@/components/common/EmptyDataMessage';
import { TwoColumnGridTemplate } from '@/styles/commonStyles';
import routes from '@/constants/routes';

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

        <S.InputContainer>
          <S.SearchIconWrapper>
            <img src="/icons/search.svg" alt="search" />
          </S.SearchIconWrapper>
          <S.InputField
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
        </S.InputContainer>
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
          <EmptyDataMessage style={{ paddingTop: '10rem' }}>
            {searchParams.get('text') === null ? '검색어를 입력해 주세요.' : '검색 결과가 없습니다.'}
          </EmptyDataMessage>
        )}
      </S.Content>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    min-height: 100%;
  `,
  InputContainer: styled.div`
    position: relative;
    width: 100%;
    margin-top: 3.2rem;
  `,
  InputField: styled.input`
    width: 100%;
    height: 3rem;
    padding: 0rem 2rem 0.8rem 2.5rem;
    border: none;
    border-bottom: ${({ theme }) => theme.border};
    ${({ theme }) => theme.typography.subTitle3};

    &:focus {
      border-bottom-color: #045905;
    }
    ::placeholder {
      color: ${({ theme }) => theme.color.inputText};
    }
  `,
  HeaderWrapper: styled.div`
    position: relative;
    padding: 6rem 3.5rem 1.3rem;
  `,
  BackButtonWrapper: styled.div`
    margin-left: -1rem;
  `,
  BackButton: styled(Link)`
    padding: 0.5rem 0.5rem 0.5rem;
  `,
  SearchBarWrapper: styled.div`
    display: flex;
    height: 3rem;
    margin-top: 4.1rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #d0d0d0;
  `,
  SearchIconWrapper: styled.div`
    position: absolute;
    top: 0.3rem;
    display: flex;
    align-items: center;
    width: 3rem;
  `,
  DeleteIconWrapper: styled.div`
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    display: flex;
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
    height: 1.2rem;
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
    color: ${({ theme }) => theme.color.sub};
  `,
  SortDropdown: styled.div`
    display: flex;
    align-items: center;

    select {
      padding: 0.5rem;
      border: 0;
      border-radius: 0.4rem;
      background-color: #fff;
      font-size: 1.4rem;
      color: ${({ theme }) => theme.color.sub};
      text-align: start;
    }
  `,
};
