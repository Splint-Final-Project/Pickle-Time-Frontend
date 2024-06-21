import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import BackButton from '@/components/common/button/BackButton';
import Button from '@/components/common/button/Button';
import ProfileBox from '@/components/my-page/edit/ProfileBox';
import ImageSelector from '@/components/my-page/edit/ImageSelector';
import AreaSetting from '@/components/my-page/edit/AreaSetting';
import useAuth from '@/hooks/zustand/useAuth';
import { BUTTON_TYPE } from '@/constants/BUTTON';
import routes from '@/constants/routes';

export default function EditProfilePage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const nicknameRef = useRef<HTMLInputElement>(null);

  const [profileState, setProfileState] = useState({
    nickname: user.nickname,
    areaCodes: user.areaCodes,
    profileImg: user.profilePic,
  });

  const handleUpdateProfil = () => {
    updateProfile({
      nickname: profileState.nickname,
      areaCodes: profileState.areaCodes,
      imgUrl: profileState.profileImg || '',
    });
    navigate(routes.mypage);
  };

  return (
    <>
      <S.TopSection>
        <S.Header>
          <BackButton />
          <h1>프로필 수정</h1>
        </S.Header>

        <ProfileBox
          profileState={profileState}
          setProfileState={setProfileState}
          nicknameRef={nicknameRef}
          user={user}
        />

        <ImageSelector profileState={profileState} setProfileState={setProfileState} />
      </S.TopSection>

      <S.BottomSection>
        <S.InnerWrap>
          <h2>주요 활동 범위</h2>
          <h3>변경을 원하는 모임 장소를 설정해 주세요</h3>
          <AreaSetting profileState={profileState} setProfileState={setProfileState} />
          <Button
            onClick={handleUpdateProfil}
            styleType={BUTTON_TYPE.DISABLE}
            style={{ color: '#8B8D94', margin: '10rem 0 3.2rem' }}
          >
            프로필 설정 완료하기
          </Button>
          <S.Footer>
            <span>회원을 탈퇴하시겠어요?</span>
            <button>회원 탈퇴하기</button>
          </S.Footer>
        </S.InnerWrap>
      </S.BottomSection>
    </>
  );
}

const S = {
  TopSection: styled.div`
    padding: 8rem 1.7rem 3.2rem;
    color: ${({ theme }) => theme.color.basic};

    h1 {
      ${({ theme }) => theme.typography.header};
    }
  `,

  Header: styled.div`
    display: flex;
    gap: 1.5rem;
  `,

  BottomSection: styled.div`
    ::before {
      display: block;
      height: 1.2rem;
      background-color: ${({ theme }) => theme.color.background};
      content: '';
    }
  `,

  InnerWrap: styled.div`
    padding: 2rem 3.3rem 25rem;

    h2 {
      ${({ theme }) => theme.typography.subTitle2};
    }
    h3 {
      padding: 0.4rem 0 2.7rem;
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body2};
    }
  `,

  Footer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: ${({ theme }) => theme.color.inputText};
      ${({ theme }) => theme.typography.detail};
    }

    button {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};
    }
  `,
};
