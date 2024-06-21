import React from 'react';
import styled from '@emotion/styled';
import BottomNav from '@/components/common/BottomNav';
import { Outlet, useLocation } from 'react-router-dom';

const breakpoints = {
  mobile: '768px',
};

const S = {
  LayoutContainer: styled.div<{ $isWhiteBack: boolean }>`
    width: 100vw;
    min-height: 100dvh;
    background-color: ${({ theme, $isWhiteBack }) => ($isWhiteBack ? theme.color.white : theme.color.background)};
    padding: 0 calc((100vw - 76.7rem) / 2);
  `,

  ContentBox: styled.div`
    background-color: ${({ theme }) => theme.color.white};
    width: 100%;
    min-height: 100vh;
  `,
};

interface MainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const { pathname } = location;
  const isWhiteBack = pathname === '/';

  return (
    <S.LayoutContainer $isWhiteBack={isWhiteBack} className="내가 맨위">
      {/* <Header /> */}
      <S.ContentBox className="나 다음">
        <Outlet />
        {children}
      </S.ContentBox>
      <BottomNav />
    </S.LayoutContainer>
  );
}
