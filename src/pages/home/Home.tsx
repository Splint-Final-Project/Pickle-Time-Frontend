import { Suspense, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import BackDropModal from '@/components/common/modal/BackDropModal';
import Carousel from '@/components/carousel/Carousel';
import PickleList from '@/components/picklecardlist/PickleCardListElement';
import PickleCardList from '@/components/picklecardlist/PickleCardList';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import SkeletonPickleCardList from '@/components/picklecardlist/PickleCardList.Skeleton';
import ReviewModal from '@/components/my-page/review/ReviewModal';
import SortButtons from '@/components/common/button/SortButtons';
import InfinitePickleCardList from '@/components/picklecard/InfinitePickleCardList';
import Button from '@/components/common/button/Button';
import { BUTTON_TYPE } from '@/constants/BUTTON';

import routes from '@/constants/routes';
import useAuth from '@/hooks/zustand/useAuth';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import ConfirmationModal from '@/components/common/modal/ConfirmationModal';
import ShareModal from '@/components/common/modal/ShareModal';
import KeepCreatingModal from '@/components/common/modal/KeepCreatingModal';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const { inProgress } = usePickleCreation();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { handleOpen } = useBottomSheetModal(state => state);
  const handleConfirmAction = () => {
    console.log('확인을 누르셨어요');
  };

  // 전역 상태
  const { user, signOut } = useAuth();

  return (
    <div style={{ paddingBottom: '8.5rem' }}>
      <S.TopNavBarContainer>
        <S.Logo src="/images/logotext.svg" onClick={() => navigate('/')} />
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
      <S.SearchBarContainer onClick={() => navigate('/search')}>
        <S.SearchInput>지역, 목표 등</S.SearchInput>
        <S.SearchIcon src="/icons/search.svg" alt="search" />
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
                navigate('/pickle-create');
              },
            });
          } else {
            navigate('/pickle-create');
          }
        }}
      >
        <S.CreatePickleIcon src="/icons/createPickle.svg" alt="" />
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
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 11px;
    margin: 18px 28px;
    background-color: #f4f7f6;
    border-radius: 8px;
  `,
  SearchInput: styled.div`
    width: 100%;
    color: var(--Input-Text, #bababa);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    background-color: transparent;
  `,
  SearchIcon: styled.img`
    width: 1.5rem;
    height: 1.5rem;
  `,
  Logo: styled.img`
    /* margin: 2rem 0rem 1.4rem; */
    width: 100px;
    cursor: pointer;
  `,
  Profile: styled.div`
    color: var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94));
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    span {
      color: var(--Basic, #181f29);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `,
  Logout: styled.button`
    color: var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94));
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  PickleCardListContainer: styled.div`
    border: 1px solid black;
  `,
  FloatingButton: styled.button`
    position: fixed;
    left: 50%;
    transform: translateX(30rem);
    bottom: 10rem;

    width: 5.7rem;
    height: 5.7rem;

    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

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
