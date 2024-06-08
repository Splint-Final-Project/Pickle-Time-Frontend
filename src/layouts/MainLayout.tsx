import React from 'react';
import styled from '@emotion/styled';
import BottomNav from '@/components/common/BottomNav';
import { Outlet } from 'react-router-dom';

const breakpoints = {
  mobile: '768px',
};

const S = {
  LayoutContainer: styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    border-left: 0.1px solid #f0f0f0;
    border-right: 0.1px solid #f0f0f0;
    width: 100%;

    @media (min-width: ${breakpoints.mobile}) {
      max-width: 767px;
      margin: 0 auto;
    }
  `,
  Content: styled.main`
    flex: 1;
    display: flex;
    flex-direction: row;
    padding-bottom: 8.5rem;
  `,
  MainContent: styled.div`
    flex: 1;
    width: 100%;
  `,
};

interface MainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <S.LayoutContainer>
      {/* <Header /> */}
      <S.Content>
        <S.MainContent>
          <Outlet />
          {children}
        </S.MainContent>
      </S.Content>
      <BottomNav />
    </S.LayoutContainer>
  );
}
