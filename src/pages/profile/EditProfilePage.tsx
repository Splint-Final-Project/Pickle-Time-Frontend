import { useRef, useState } from 'react';
import styled from '@emotion/styled';

import BackButton from '@/components/common/button/BackButton';
import Button from '@/components/common/button/Button';
import ActivityArea from '@/components/my-page/edit/ActivityArea';
import useAuth from '@/hooks/zustand/useAuth';
import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon';
import CancelIcon from '@/assets/icons/CancelIcon';
import EditIcon from '@/assets/icons/EditIcon';
import { BUTTON_TYPE } from '@/constants/BUTTON';
import { userRequests } from '@/apis/user.api';
import openai from '@/apis/openai';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import AreaSelectModal from '@/components/common/modal/AreaSelectModal';

export default function EditProfilePage() {
  const { user, updateProfile } = useAuth();

  const [nickname, setNickname] = useState(user.nickname);
  const [areaCodes, setAreaCodes] = useState(user.areaCodes);
  const [profileImg, setProfileImg] = useState<File | null>(user.profilePic);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const { handleOpen } = useBottomSheetModal(state => state);

  const nicknameRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const handleClickSelect = (imageInput: any) => {
    imageInput.current.click();
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsImgLoading(true);
        const { data: profileImgUrl } = await userRequests.updateImgUrl(file);
        if (profileImgUrl.url) setProfileImg(profileImgUrl.url);
      } catch (e) {
        console.log(e);
      } finally {
        setIsImgLoading(false);
      }
    }
  };

  const generateImage = async () => {
    const res = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `"사용자의 프로필 이미지를 생성하고 싶은데, 사용자의 ${nickname}을 보고 떠오르는 이미지를 약간 캐릭터화 해서 생성해줘!"`,
      n: 1,
      size: '1792x1024',
    });
    const image_url = res.data[0].url;
    console.log('ai가 생성한 이미지', image_url);
    return image_url;
  };

  const handleClickAI = async () => {
    try {
      setIsImgLoading(true);
      const image_url = await generateImage();

      if (image_url) {
        const imageUrlInStorage = await userRequests.createGeneratedImgUrl(image_url);
        console.log('저장된 ai 이미지', imageUrlInStorage);
        if (imageUrlInStorage?.data.url) {
          setProfileImg(imageUrlInStorage?.data.url);
          console.log(imageUrlInStorage?.data.url);
        }
      } else {
        throw new Error('이미지 생성 실패');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsImgLoading(false);
    }
  };

  const handleAreaSelectComplete = (newAreaCodes: number[]) => {
    setAreaCodes(newAreaCodes);
  };

  return (
    <>
      <S.TopSection>
        <S.Header>
          <BackButton />
          <h1>프로필 수정</h1>
        </S.Header>

        <S.ProfileBox>
          <S.ProfileImg>
            {profileImg ? <img className="profile-img" src={profileImg} alt="프로필 이미지" /> : <DefaultProfileIcon />}
            <EditIcon style={{ position: 'absolute', bottom: -3, right: -5, cursor: 'pointer' }} />
          </S.ProfileImg>
          <S.NickName>
            <input
              ref={nicknameRef}
              className="nickname"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
            />
            <CancelIcon
              onClick={() => {
                setNickname('');
                nicknameRef.current?.focus();
              }}
              style={{ position: 'absolute', top: '0.3rem', right: 0, cursor: 'pointer' }}
            />
          </S.NickName>
          <span className="email">{user.email}</span>
        </S.ProfileBox>

        <input type="file" accept="image/*" ref={imgInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <S.ImgSelectContainer>
          <Button
            disabled={isImgLoading}
            onClick={() => handleClickSelect(imgInputRef)}
            styleType={BUTTON_TYPE.DISABLE}
          >
            <img src="/icons/pictureIcon.svg" />
            <span>라이브러리에서 선택</span>
          </Button>
          <Button
            disabled={isImgLoading}
            onClick={handleClickAI}
            styleType={BUTTON_TYPE.DISABLE}
            style={{ marginTop: '1.4rem' }}
          >
            <img src="/icons/aiIcon.svg" />
            <span>{isImgLoading ? 'AI로 생성 중...' : 'AI로 생성하기'}</span>
          </Button>
        </S.ImgSelectContainer>
      </S.TopSection>

      <S.BottomSection>
        <S.InnerWrap>
          <h2>주요 활동 범위</h2>
          <h3>변경을 원하는 모임 장소를 설정해 주세요</h3>
          <S.AreaSettingBox>
            활동 범위 설정하기
            <button
              onClick={() =>
                handleOpen({
                  renderComponent: AreaSelectModal,
                  areaCodes: areaCodes,
                  onComplete: handleAreaSelectComplete,
                })
              }
            >
              <img src="/icons/rightArrowIcon.svg" />
            </button>
          </S.AreaSettingBox>
          <ActivityArea areaCodes={areaCodes} />
          <Button styleType={BUTTON_TYPE.DISABLE} style={{ color: '#8B8D94', margin: '10rem 0 3.2rem' }}>
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

  ProfileBox: styled.div`
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

  ImgSelectContainer: styled.div`
    padding: 0 1.5rem;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.2rem;
      padding: 1rem 0;
    }

    span {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};
    }
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

  AreaSettingBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1.4rem;
    margin-bottom: 2.1rem;
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.color.secondary2};
    ${({ theme }) => theme.typography.body3};
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
