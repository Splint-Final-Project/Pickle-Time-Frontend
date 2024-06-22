import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';

import MenuList from '@/components/my-page/MenuList';
import DynamicRender from '@/components/my-page/DynamicRender';
import BackButton from '@/components/common/button/BackButton';
import routes from '@/constants/routes';
import { MY_MENU } from '@/constants/BUTTON';
import useAuth from '@/hooks/zustand/useAuth';
import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon';
import EditIcon from '@/assets/icons/EditIcon';

export type MyMenu = (typeof MY_MENU)[keyof typeof MY_MENU];

export default function MyPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMenu = searchParams.get('tab') || ('point' as 'point' | 'review' | 'wishlist');
  const { user } = useAuth();

  const menuArray = Object.entries(MY_MENU).map(([key, label]) => ({
    label,
    icon: `/icons/mypage-menu/${key.toLowerCase()}Icon.svg`,
    selectedIcon: `/icons/mypage-menu/${key.toLowerCase()}SelectedIcon.svg`,
    func: () => {
      searchParams.set('tab', key.toLowerCase());
      setSearchParams(searchParams, { replace: true });
    },
  }));

  useEffect(() => {
    if (searchParams.get('tab') === null) {
      searchParams.set('tab', 'point');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams.get('tab')]);

  return (
    <>
      <S.TopSection>
        <S.Header>
          <BackButton />
          <h1>마이 페이지</h1>
        </S.Header>
        <S.Profile className="프로필">
          <S.ProfileImg onClick={() => navigate(routes.editProfile)}>
            {user.profilePic ? <img src={user.profilePic} alt="프로필 이미지" /> : <DefaultProfileIcon />}
            <EditIcon style={{ position: 'absolute', bottom: -3, right: -5, cursor: 'pointer' }} />
          </S.ProfileImg>
          <span className="nickname">{user.nickname}</span>
          <span className="email">{user.email}</span>
        </S.Profile>
        <MenuList menuList={menuArray} />
      </S.TopSection>

      <S.BottomSection>
        <DynamicRender menu={selectedMenu as 'point' | 'review' | 'wishlist'} />
      </S.BottomSection>
    </>
  );
}

const S = {
  TopSection: styled.div`
    padding: 6rem 1.7rem 5rem;
    color: ${({ theme }) => theme.color.basic};
  `,

  Header: styled.div`
    display: flex;
    align-items: center;
    padding: 0 1.8rem;
    gap: 2rem;

    h1 {
      ${({ theme }) => theme.typography.header};
    }
  `,

  Profile: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4rem 0 4.7rem;

    & .nickname {
      ${({ theme }) => theme.typography.subTitle1};
      margin: 1.1rem 0 0.2rem;
    }
    & .email {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};
    }
  `,

  ProfileImg: styled.div`
    position: relative;
    display: flex;
    justify-content: center;

    img {
      width: 6.8rem;
      height: 6.8rem;
      border-radius: 1.5rem;
      object-fit: cover;
    }
  `,

  User: styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;
  `,

  SettingBtn: styled(Link)`
    width: 2.4rem;
    height: 2.4rem;
  `,

  BottomSection: styled.div`
    ::before {
      display: block;
      height: 1.2rem;
      background-color: ${({ theme }) => theme.color.background};
      content: '';
    }
  `,
};
