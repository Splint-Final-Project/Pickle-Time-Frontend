import routes from '@/constants/routes';
import PickleCardMockData from '@/mocks/pickleCardData';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { GridTemplate } from '@/styles/commonStyles';
import InfinitePickleCardLoader from '@/components/picklecard/InfinitePickleCardLoader';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const S = {
  Section: styled.section``,
  Container: styled.div`
    height: 100dvh;
  `,
  Wrapper: styled.div`
    position: relative;
    margin-bottom: 2rem;
    padding: 10rem 2.9rem 1.8rem;
    height: 30rem;
  `,
  BackButtonWrapper: styled.div`
    margin-left: -1rem;
    margin-bottom: 3.5rem;
  `,
  BackButton: styled(Link)`
    padding: 0.5rem 0.5rem 0.5rem 0.9rem;
  `,
  Icon: styled.img`
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  `,
  Summary: styled.p`
    color: #9e9e9e;
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.7rem;
  `,
  Title: styled.h2`
    color: #292929;
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 1.8rem;
    display: flex;
  `,
  ImgContainer: styled.div`
    margin-left: 1.7rem;
    display: flex;
    gap: 0.8rem;
  `,
  ImgWrapper: styled.div`
    width: 2.5rem;
    height: 2.5rem;
  `,
  ListViewBox: styled.div`
    margin-left: -2.8rem;
    margin-right: -2.8rem;
    overflow-x: auto;
    padding: 0.5rem 0;
    scrollbar-width: none;
  `,
  TabWrapper: styled.div`
    display: flex;
    margin-top: 4rem;
    gap: 1.4rem;
  `,
  Tab: styled.button<{ isActive: boolean }>`
    font-size: 1.4rem;
    border-radius: 18px;
    background: ${({ isActive }) => (isActive ? '#000' : '#f1f1f1')};
    color: ${({ isActive }) => (isActive ? '#fff' : 'var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94))')};
    padding: 0.7rem 1.4rem;
    transition:
      background-color 0.3s,
      color 0.3s;

    &:hover {
      background: ${({ isActive }) => (isActive ? '#000' : '#dcdcdc')};
      color: ${({ isActive }) => (isActive ? '#fff' : '#8b8d94')};
    }
  `,
  Content: styled.div`
    background: #f2f3f5;
    min-height: calc(100% - 30rem);
    padding: 2rem 2.9rem 1.8rem;

    @media (max-width: 550px) {
      padding: 2rem 0.5rem;
    }
    @media (max-width: 500px) {
      padding: 2rem 0rem;
    }
  `,
  List: styled.ul`
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
    transition: 0.5s;
  `,
};

export default function PopularPickleList() {
  const [activeTab, setActiveTab] = useState('전체');

  const loaderRef = useRef<HTMLDivElement>(null);

  // 무한 스크롤 수정
  // const { data: infiniteWholePickleData, fetchNextPage, hasNextPage } = useGetInfinitePickles();

  // useIntersectionObserver(async () => {
  //   await fetchNextPage();
  // }, loaderRef);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // Todo: header 부분 공통으로 빼기, 카드 스타일 반응형으로 움직이게 바꾸기
  return (
    <S.Container>
      <S.Wrapper>
        <S.Section>
          <S.BackButtonWrapper>
            <S.BackButton to={routes.home}>
              <S.Icon src="/icons/backButton.svg" alt="Back Button" />
            </S.BackButton>
          </S.BackButtonWrapper>
          <S.Summary>참여하고 싶어지는 급상승 피클!</S.Summary>
          <S.Title>
            인기 급상승 피클
            <S.ImgContainer>
              <S.ImgWrapper>
                <img src="/images/category1.svg" alt="" />
              </S.ImgWrapper>
              <S.ImgWrapper>
                <img src="/images/category2.svg" alt="" />
              </S.ImgWrapper>
              <S.ImgWrapper>
                <img src="/images/category3.svg" alt="" />
              </S.ImgWrapper>
            </S.ImgContainer>
          </S.Title>
        </S.Section>
        <S.TabWrapper>
          {['전체', '운동', '취미', '스터디'].map(tab => (
            <S.Tab key={tab} isActive={activeTab === tab} onClick={() => handleTabClick(tab)}>
              {tab}
            </S.Tab>
          ))}
        </S.TabWrapper>
      </S.Wrapper>
      <S.Content>
        <GridTemplate>
          <PickleCardMockData />
        </GridTemplate>
        {/* <InfinitePickleCardLoader
          loaderRef={loaderRef}
          style={!hasNextPage ? { display: 'none' } : { marginTop: '2rem' }}
        /> */}
      </S.Content>
    </S.Container>
  );
}
