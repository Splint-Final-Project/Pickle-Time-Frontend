import { Suspense, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import KaKaoMap from '@/components/map/KaKaoMap';
import BackDropModal from '@/components/common/modal/BackDropModal';
import HeartButton from '@/components/common/button/HeartButton';
import { useCreatePickleMutation } from '@/hooks/query/pickles';
import MainLayout from '@/layouts/MainLayout';
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

const S = {
  TopNavBarContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4rem;
  `,
  Logo: styled.img`
    margin: 2rem 0rem 1.4rem;
    width: 10rem;
  `,
  Profile: styled.div`
    color: ${({ theme }) => theme.color.black};
    font-weight: bold;
  `,
  Logout: styled.button`
    border: 1px solid ${({ theme }) => theme.color.secondary};
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.white};
    border-radius: 0.8rem;
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

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { handleOpen } = useBottomSheetModal(state => state);

  // 전역 상태
  const { getMe, signOut } = useAuth();

  return (
    <MainLayout>
      <S.TopNavBarContainer>
        <S.Logo src="images/logotext.svg" />
        <S.Profile>
          {getMe() ? (
            <>
              {getMe()?.nickname}님&nbsp;&nbsp;<S.Logout onClick={signOut}>로그아웃</S.Logout>
            </>
          ) : (
            <Link to={routes.signIn}>Sign In</Link>
          )}
        </S.Profile>
      </S.TopNavBarContainer>
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
        <ErrorBoundary fallback={Error}>
          <Suspense fallback={<SkeletonPickleCardList />}>
            <SortButtons />
            <InfinitePickleCardList />
          </Suspense>
        </ErrorBoundary>
      </PickleList.Container>

      <S.FloatingButton type="button" onClick={() => navigate('/pickle-create')}>
        <S.CreatePickleIcon src="/icons/createPickle.svg" alt="" />
      </S.FloatingButton>

      <br />
      <br />
      <div>
        <Link to={'/pickle/6662941ec1151126a67f6530'}>테스트 피클 보기+신청하기테스트</Link>
      </div>
      <br />
      <br />

      <br />
      <br />
      <br />

      <button onClick={() => handleOpen({ renderComponent: ReviewModal })}>리뷰작성</button>

      <button type="button" onClick={openModal}>
        모달 테스트 버튼
      </button>
      <BackDropModal isOpen={isModalOpen} onClose={closeModal}>
        <div>티라노 앙</div>
      </BackDropModal>
    </MainLayout>
  );
}

function Error({ error }: { error: Error }) {
  console.log(error);
  return <h1>에러 발생</h1>;
}
