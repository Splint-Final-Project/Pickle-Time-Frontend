import React from 'react';
import styled from '@emotion/styled';

const breakpoints = {
  mobile: '768px',
};

const S = {
  Container: styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 767px;
    height: 50px;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: ${breakpoints.mobile}) {
      max-width: 100%;
    }
  `,
  NavItem: styled.a`
    text-decoration: none;
    background-color: #333;
    width: 30px;
    height: 30px;
    margin: 0 50px;
    @media (max-width: ${breakpoints.mobile}) {
      margin: 0 10px;
    }
  `,
};

export default function BottomNav() {
  return (
    <S.Container>
      <S.NavItem></S.NavItem>
      <S.NavItem></S.NavItem>
      <S.NavItem></S.NavItem>
      <S.NavItem></S.NavItem>
    </S.Container>
  );
}
