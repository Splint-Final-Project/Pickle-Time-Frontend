import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import MenuList from '@/components/my-page/MenuList';
import routes from '@/constants/routes';

export default function MyPage() {
  return (
    <S.Container>
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
        <MenuList />
      </S.TopSection>
      <div className="다이나믹렌더섹션">다이나믹렌더 컴포넌트</div>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    color: ${({ theme }) => theme.color.basic};
  `,

  TopSection: styled.div`
    padding: 8rem 2rem 5rem;

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
};
