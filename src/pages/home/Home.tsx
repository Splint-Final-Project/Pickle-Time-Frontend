import { Link, useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/zustand/useAuth';
import KaKaoMap from '@/components/map/KaKaoMap';
import routes from '@/constants/routes';
import BackDropModal from '@/components/common/modal/BackDropModal';
import { Suspense, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import HeartButton from '@/components/common/button/HeartButton';
import useHeartButtonClick from '@/hooks/useHeartButtonClick';
import { useCreatePickleMutation } from '@/hooks/query/pickles';
import MainLayout from '@/layouts/MainLayout';
import Carousel from '@/components/carousel/Carousel';
import PickleList from '@/components/picklecardlist/PickleCardListElement';
import PickleCardList from '@/components/picklecardlist/PickleCardList';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import SkeletonPickleCardList from '@/components/picklecardlist/PickleCardList.Skeleton';
import SortButtons from '@/components/common/button/SortButtons';
import InfinitePickleCardList from '@/components/picklecard/InfinitePickleCardList';

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
  PickleCardListContainer: styled.div`
    border: 1px solid black;
  `,
};

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const { isHeartClicked, handleHeartClick } = useHeartButtonClick({
    pickleId: '1',
    isInUserWishList: false,
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // 전역 상태
  const { getMe, signOut } = useAuth();

  return (
    <MainLayout>
      <S.TopNavBarContainer>
        <S.Logo src="images/logotext.svg" />
        <div>
          {getMe() ? (
            <>
              안녕하세요 {getMe()?.nickname}님 <button onClick={signOut}>로그아웃</button>
            </>
          ) : (
            <Link to={routes.signIn}>Sign In</Link>
          )}
        </div>
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
            {/* <PickleCardList category="total" /> */}
            <SortButtons />
            <InfinitePickleCardList />
          </Suspense>
        </ErrorBoundary>
      </PickleList.Container>

      <br />
      <br />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={routes.chatList}>Chat List</Link>
      </div>
      <br />
      <br />
      <div>
        <Link to={'/pickle/6662941ec1151126a67f6530'}>테스트 피클 보기+신청하기테스트</Link>
      </div>
      <br />
      <br />
      <button type="button" onClick={() => navigate('/pickle-create')}>
        피클 생성 페이지로 이동
      </button>
      <br />
      <br />
      <br />

      {/* <KaKaoMap /> */}
      <button type="button" onClick={openModal}>
        모달 테스트 버튼
      </button>
      <BackDropModal isOpen={isModalOpen} onClose={closeModal}>
        <div>티라노 앙</div>
      </BackDropModal>
      {/* <HeartButton isActive={isHeartClicked} onClick={handleHeartClick} /> */}
    </MainLayout>
  );
}

function Error({ error }: { error: Error }) {
  console.log(error);
  return <h1>에러 발생</h1>;
}
