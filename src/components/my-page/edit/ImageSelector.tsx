import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/common/button/Button';
import openai from '@/apis/openai';
import { userRequests } from '@/apis/user.api';
import { BUTTON_TYPE } from '@/constants/BUTTON';

export default function ImageSelector({ profileState, setProfileState }) {
  const [isImgLoading, setIsImgLoading] = useState(false);
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
        if (profileImgUrl.url) setProfileState(prevState => ({ ...prevState, profileImg: profileImgUrl.url }));
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
      prompt: `"사용자의 프로필 이미지를 생성하고 싶은데, 사용자의 ${profileState.nickname}을 보고 떠오르는 이미지를 약간 캐릭터화 해서 생성해줘!"`,
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
          setProfileState(prevState => ({ ...prevState, profileImg: imageUrlInStorage?.data.url }));
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

  return (
    <S.ImgSelectContainer>
      <input type="file" accept="image/*" ref={imgInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      <Button disabled={isImgLoading} onClick={() => handleClickSelect(imgInputRef)} styleType={BUTTON_TYPE.DISABLE}>
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
  );
}

const S = {
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
};
