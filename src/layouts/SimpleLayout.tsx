import React from 'react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const breakpoints = {
  mobile: '768px',
};

const S = {
  LayoutContainer: styled.div`
    width: 100vw;
    min-height: 100dvh;
    background-color: ${({ theme }) => theme.color.background};
    padding: 0 calc((100vw - 76.7rem) / 2);
  `,
  ContentBox: styled.div`
    background-color: ${({ theme }) => theme.color.white};
    width: 100%;
    min-height: 100vh;
  `,
};

interface SimpleLayoutProps {
  children?: React.ReactNode;
}

export default function SimpleLayout({ children }: SimpleLayoutProps) {
  return (
    <S.LayoutContainer>
      <S.ContentBox>
        <Outlet />
        {children}
      </S.ContentBox>
    </S.LayoutContainer>
  );
}
