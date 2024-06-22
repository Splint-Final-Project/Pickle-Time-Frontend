import { Suspense, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import Carousel from '@/components/carousel/Carousel';
import PickleList from '@/components/picklecardlist/PickleCardListElement';
import PickleCardList from '@/components/picklecardlist/PickleCardList';
import SortButtons from '@/components/common/button/SortButtons';
import InfinitePickleCardList from '@/components/picklecard/InfinitePickleCardList';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import SkeletonPickleCardList from '@/components/picklecardlist/PickleCardList.Skeleton';
import KeepCreatingModal from '@/components/common/modal/KeepCreatingModal';

import routes from '@/constants/routes';
import useAuth from '@/hooks/zustand/useAuth';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { inProgress } = usePickleCreation();
  const { handleOpen } = useBottomSheetModal(state => state);

  return (
    <div style={{ paddingBottom: '8.5rem' }}>
      <S.TopNavBarContainer>
        <S.Logo src="/images/logotext.svg" onClick={() => navigate(routes.home)} />
        <S.Profile>
          {user ? (
            <>
              <span>{user?.nickname}</span>&nbsp;님&nbsp;&nbsp;&nbsp;<S.Logout onClick={signOut}>로그아웃</S.Logout>
            </>
          ) : (
            <Link to={routes.signIn}>Sign In</Link>
          )}
        </S.Profile>
      </S.TopNavBarContainer>
      <S.SearchBarContainer onClick={() => navigate(routes.pickleSearchResults)}>
        <S.SearchInput>지역, 목표 등</S.SearchInput>
        <S.SearchIcon src="/icons/search.svg" alt="검색바 아이콘" />
      </S.SearchBarContainer>
      <Carousel />
      {/* 인기 급상승 피클 */}
      <PickleList.Container>
        <PickleList.Header category="popular" />
        <ErrorBoundary fallback={Error}>
          <Suspense fallback={<SkeletonPickleCardList />}>
            <PickleCardList category="popular" />
          </Suspense>
        </ErrorBoundary>
      </PickleList.Container>
      {/* 마감 임박 피클 */}
      <PickleList.Container sectionBg>
        <PickleList.Header category="hotTime" />
        <ErrorBoundary fallback={Error}>
          <Suspense fallback={<SkeletonPickleCardList />}>
            <PickleCardList category="hotTime" />
          </Suspense>
        </ErrorBoundary>
      </PickleList.Container>
      {/* 전체 피클 */}
      <PickleList.Container>
        <PickleList.Header category="total" />
        <SortButtons />
        <InfinitePickleCardList />
      </PickleList.Container>
      <S.FloatingButton
        type="button"
        onClick={() => {
          if (inProgress) {
            handleOpen({
              renderComponent: KeepCreatingModal,
              callback: () => {
                navigate(routes.pickleCreate);
              },
            });
          } else {
            navigate(routes.pickleCreate);
          }
        }}
      >
        <S.CreatePickleIcon src="/icons/createPickle.svg" alt="피클생성 아이콘" />
      </S.FloatingButton>
    </div>
  );
}

function Error({ error }: { error: Error }) {
  console.log(error);
  return <h1>에러 발생</h1>;
}

const S = {
  TopNavBarContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.8rem 2.8rem 0;
  `,
  SearchBarContainer: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem 1.1rem;
    margin: 1.8rem 2.8rem;
    background-color: #f4f7f6;
    border-radius: 0.8rem;
    cursor: pointer;
  `,
  SearchInput: styled.div`
    width: 100%;
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.color.inputText};
    ${({ theme }) => theme.typography.body3};
  `,
  SearchIcon: styled.img`
    width: 1.5rem;
    height: 1.5rem;
  `,
  Logo: styled.img`
    width: 10rem;
    cursor: pointer;
  `,
  Profile: styled.div`
    color: ${({ theme }) => theme.color.sub};
    ${({ theme }) => theme.typography.body1};

    span {
      color: ${({ theme }) => theme.color.basic};
    }
  `,
  Logout: styled.button`
    color: ${({ theme }) => theme.color.sub};
    ${({ theme }) => theme.typography.body1};
  `,
  PickleCardListContainer: styled.div`
    border: 1px solid black;
  `,
  FloatingButton: styled.button`
    position: fixed;
    left: 50%;
    bottom: 10rem;
    transform: translateX(30rem);
    display: flex;
    justify-content: center;
    align-items: center;

    width: 5.7rem;
    height: 5.7rem;
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.color.secondary};
    }
    @media (max-width: 767px) {
      left: 85%;
      transform: translateX(0);
    }
    @media (max-width: 460px) {
      left: 80%;
      transform: translateX(0);
    }
  `,
  CreatePickleIcon: styled.img`
    width: 2.9rem;
    height: 2.8rem;
  `,
};
