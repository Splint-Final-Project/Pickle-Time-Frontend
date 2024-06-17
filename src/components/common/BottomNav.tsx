import React from 'react';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import routes from '@/constants/routes';

const breakpoints = {
  mobile: '768px',
};

interface NavItemProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const S = {
  Container: styled.div`
    position: fixed;
    z-index: 99999;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 767px;
    height: 8.5rem;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px 20px 0 0;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.07);

    @media (max-width: ${breakpoints.mobile}) {
      max-width: 100%;
    }
  `,
  NavItem: styled(({ active, ...props }: NavItemProps) => <Link {...props} />)<{ active: boolean }>`
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10rem;
    height: 50px;
    opacity: ${props => (props.active ? 1 : 0.5)};

    @media (max-width: ${breakpoints.mobile}) {
      /* margin: 0 10px; */
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  `,
  Icon: styled.img`
    height: 100%;
    margin-bottom: 8px;
    @media (max-width: 500px) {
      height: 45%;
    }
  `,
};

export default function BottomNav() {
  const location = useLocation();

  return (
    <S.Container>
      <S.NavItem to={routes.home} active={location.pathname === routes.home}>
        <S.Icon src="/icons/bottomNavbar/home.svg" alt="Home" />홈
      </S.NavItem>
      <S.NavItem to={routes.pickle} active={location.pathname === routes.pickle}>
        <S.Icon src="/icons/bottomNavbar/marker.svg" alt="Marker" />내 주변
      </S.NavItem>
      <S.NavItem to={routes.myPickles} active={location.pathname === routes.myPickles}>
        <S.Icon src="/icons/bottomNavbar/myPickle.svg" alt="My Pickle" />내 피클
      </S.NavItem>
      <S.NavItem to={routes.chatList} active={location.pathname === routes.chatList}>
        <S.Icon src="/icons/bottomNavbar/message.svg" alt="Message" />
        피클 메세지
      </S.NavItem>
      <S.NavItem to={routes.mypage} active={location.pathname === routes.mypage}>
        <S.Icon src="/icons/bottomNavbar/myPage.svg" alt="My Page" />
        마이 페이지
      </S.NavItem>
    </S.Container>
  );
}
