import CancelIcon from '@/assets/icons/CancelIcon';
import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon';
import EditIcon from '@/assets/icons/EditIcon';
import styled from '@emotion/styled';

interface ProfileBoxProps {
  profileState: {
    nickname: string;
    areaCodes: number[];
    profileImg: string;
  };
  setProfileState: React.Dispatch<
    React.SetStateAction<{
      nickname: string;
      areaCodes: number[];
      profileImg: string;
    }>
  >;
  nicknameRef: React.RefObject<HTMLInputElement>;
  user: {
    email: string;
  };
}

export default function ProfileBox({ profileState, setProfileState, nicknameRef, user }: ProfileBoxProps) {
  return (
    <S.ProfileContainer>
      <S.ProfileImg>
        {profileState.profileImg ? (
          <img className="profile-img" src={profileState.profileImg} alt="프로필 이미지" />
        ) : (
          <DefaultProfileIcon />
        )}
        <EditIcon style={{ position: 'absolute', bottom: -3, right: -5, cursor: 'pointer' }} />
      </S.ProfileImg>
      <S.NickName>
        <input
          ref={nicknameRef}
          className="nickname"
          value={profileState.nickname}
          onChange={e => setProfileState({ ...profileState, nickname: e.target.value })}
        />
        <CancelIcon
          onClick={() => {
            setProfileState({ ...profileState, nickname: '' });
            nicknameRef.current?.focus();
          }}
          style={{ position: 'absolute', top: '0.3rem', right: 0, cursor: 'pointer' }}
        />
      </S.NickName>
      <span className="email">{user.email}</span>
    </S.ProfileContainer>
  );
}

const S = {
  ProfileContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.3rem;
    margin: 4.2rem 0 3.5rem;

    & .profile-img {
      width: 8.1rem;
      height: 8.1rem;
      border-radius: 1.5rem;
      object-fit: cover;
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
  `,

  NickName: styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 45%;

    & .nickname {
      width: 100%;
      padding-bottom: 0.9rem;
      border: none;
      border-bottom: ${({ theme }) => theme.border};
      text-align: center;
      ${({ theme }) => theme.typography.subTitle3};
    }
  `,
};
