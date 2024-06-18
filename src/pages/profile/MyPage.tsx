import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import MenuList from '@/components/my-page/MenuList';
import DynamicRender from '@/components/my-page/DynamicRender';
import routes from '@/constants/routes';
import { MY_MENU } from '@/constants/BUTTON';

export type MyMenu = (typeof MY_MENU)[keyof typeof MY_MENU];

export default function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState<MyMenu>(MY_MENU.POINT);

  const menuArray = Object.entries(MY_MENU).map(([key, label]) => ({
    label,
    icon: `/icons/mypage-menu/${key.toLowerCase()}Icon.svg`,
    func: () => {
      setSelectedMenu(label);
    },
  }));

  return (
    <>
      <S.TopSection>
        <S.Header>
          <h1>마이페이지</h1>
          <S.SettingBtn to={routes.editProfile}>
            <img src="/icons/settingIcon.svg" alt="프로필 수정" />
          </S.SettingBtn>
        </S.Header>
        <S.Profile className="프로필">
          <img src="https://avatars.githubusercontent.com/u/124874266?v=4" alt="프로필 이미지" />
          <span className="nickname">닉네임</span>
          <span className="email">이메일</span>
        </S.Profile>
        <MenuList menuList={menuArray} />
      </S.TopSection>

      <S.BottomSection>
        <DynamicRender menu={selectedMenu} />
      </S.BottomSection>
    </>
  );
}

const S = {
  TopSection: styled.div`
    padding: 8rem 2rem 5rem;
    color: ${({ theme }) => theme.color.basic};

    h1 {
      ${({ theme }) => theme.typography.header};
    }
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Profile: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4rem 0 4.7rem;

    img {
      width: 6.8rem;
      height: 6.8rem;
      border-radius: 1.5rem;
      object-fit: cover;
    }
    & .nickname {
      ${({ theme }) => theme.typography.subTitle1};
      margin: 1.1rem 0 0.2rem;
    }
    & .email {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};
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
    margin-bottom: 8.5rem;

    ::before {
      display: block;
      height: 1.2rem;
      background-color: ${({ theme }) => theme.color.background};
      content: '';
    }
  `,
};
