import { useState } from 'react';
import styled from '@emotion/styled';
import PickleListHeader from '@/components/pickleWholeList/PickleListHeader';
import PickleListCard from '@/components/pickleWholeList/PickleListCard';
import { TwoColumnGridTemplate } from '@/styles/commonStyles';

const imgsrc = ['', '/images/category1.svg', '/images/category2.svg', '/images/category3.svg'];

export default function PopularPickleList() {
  const [activeTab, setActiveTab] = useState('전체');
  const tabs = ['전체', '운동', '취미', '스터디'];

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <S.Container>
      <PickleListHeader title="인기 급상승 피클" summary="참여하고 싶어지는 급상승 피클!">
        <S.TabWrapper>
          {tabs.map((tab, index) => (
            <S.Tab key={tab} $active={activeTab === tab} onClick={() => handleTabClick(tab)}>
              {imgsrc[index] && (
                <S.ImgWrapper>
                  <S.Img src={imgsrc[index]} alt={tab} />
                </S.ImgWrapper>
              )}
              {tab}
            </S.Tab>
          ))}
        </S.TabWrapper>
      </PickleListHeader>
      <S.Content>
        <TwoColumnGridTemplate>
          <PickleListCard category="popular" />
        </TwoColumnGridTemplate>
      </S.Content>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    height: 100dvh;
  `,
  TabWrapper: styled.div`
    display: flex;
    margin-top: 4rem;
    gap: 1.4rem;

    @media (max-width: 500px) {
      gap: 1rem;
    }
  `,
  Tab: styled.button<{ $active: boolean }>`
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* 인터넷익스플로러 */
    user-select: none;

    display: inline-flex;
    align-items: center;
    padding: 0.7rem 1.4rem;
    border-radius: 1.8rem;
    font-size: 1.4rem;
    background: ${({ $active }) => ($active ? '#000' : '#f1f1f1')};
    color: ${({ $active }) => ($active ? '#fff' : 'var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94))')};
    transition:
      background-color 0.3s,
      color 0.3s;

    &:hover {
      background: ${({ $active }) => ($active ? '#000' : '#dcdcdc')};
      color: ${({ $active }) => ($active ? '#fff' : '#8b8d94')};
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  `,
  Content: styled.div`
    background: #f2f3f5;
    min-height: calc(100% - 30rem);
    padding: 2rem 2.9rem 1.8rem;
  `,
  ImgWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    margin-right: 0.3rem;
  `,
  Img: styled.img`
    width: 1.8rem;
    height: 1.8rem;
  `,
};
