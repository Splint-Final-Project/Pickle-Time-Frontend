import PickleListHeader from '@/components/pickleWholeList/PickleListHeader';
import styled from '@emotion/styled';
import { TwoColumnGridTemplate } from '@/styles/commonStyles';
import { useState } from 'react';
import PickleListCard from '@/components/pickleWholeList/PickleListCard';

const S = {
  Container: styled.div`
    height: 100dvh;
  `,
  TabWrapper: styled.div`
    display: flex;
    margin-top: 4rem;
    gap: 1.4rem;
  `,
  Tab: styled.button<{ $isActive: boolean }>`
    font-size: 1.4rem;
    border-radius: 18px;
    background: ${({ $isActive }) => ($isActive ? '#000' : '#f1f1f1')};
    color: ${({ $isActive }) => ($isActive ? '#fff' : 'var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94))')};
    padding: 0.7rem 1.4rem;
    transition:
      background-color 0.3s,
      color 0.3s;

    &:hover {
      background: ${({ $isActive }) => ($isActive ? '#000' : '#dcdcdc')};
      color: ${({ $isActive }) => ($isActive ? '#fff' : '#8b8d94')};
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
};

export default function HotTimePickleList() {
  const [activeTab, setActiveTab] = useState('전체');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <S.Container>
      <PickleListHeader title="마감 임박 피클" summary="마감이 얼마 남지 않은 피클!">
        <S.TabWrapper>
          {['전체', '운동', '취미', '스터디'].map(tab => (
            <S.Tab key={tab} $isActive={activeTab === tab} onClick={() => handleTabClick(tab)}>
              {tab}
            </S.Tab>
          ))}
        </S.TabWrapper>
      </PickleListHeader>
      <S.Content>
        <TwoColumnGridTemplate>
          <PickleListCard category="hotTime" />
        </TwoColumnGridTemplate>
      </S.Content>
    </S.Container>
  );
}
