import React from 'react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const breakpoints = {
  mobile: '768px',
};

const S = {
  LayoutContainer: styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    border-left: 0.1px solid #e1e1e1;
    border-right: 0.1px solid #e1e1e1;
    width: 100%;

    @media (min-width: ${breakpoints.mobile}) {
      max-width: 767px;
      margin: 0 auto;
    }
  `,
  Content: styled.main`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
};

interface SimpleLayoutProps {
  children?: React.ReactNode;
}

export default function SimpleLayout({ children }: SimpleLayoutProps) {
  return (
    <S.LayoutContainer>
      <S.Content>
        <Outlet />
        {children}
      </S.Content>
    </S.LayoutContainer>
  );
}
