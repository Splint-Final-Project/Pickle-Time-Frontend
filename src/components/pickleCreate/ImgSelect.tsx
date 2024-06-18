import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import { useRef, useState } from 'react';
import SelectInLibraryIcon from '/icons/selectInLibrary.svg';
import GenerateAIICon from '/icons/generateAI.svg';
import styled from '@emotion/styled';
import Spinner from '@/components/common/Spinner';
import openai from '@/apis/openai';
import { picklesRequests } from '@/apis/pickle.api';

export default function ImgSelect() {
  const { title, imgUrl, setImgUrl, isImgLoading, setIsImgLoading } = usePickleCreation();
  const imageInput = useRef(null);

  async function generateImage() {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `"${title}"라는 제목으로 스터디 모임을 만들고 싶은데, 우리 모임을 소개하는 간결한 이미지를 생성해 줘. 글자는 넣지 말고, 멀리서도 잘 보여야 하니 아주 단순해야 해.`,
      n: 1,
      size: '1792x1024',
    });
    const image_url = response.data[0].url;
    return image_url;
  };

  const handleClickAI = async () => {
    try {
      setIsImgLoading(true);
      const image_url = await generateImage();
      if (image_url) {
        const imageUrlInStorage = await picklesRequests.createGeneratedImgUrl(image_url);

        if(imageUrlInStorage?.data.url) {
          setImgUrl(imageUrlInStorage?.data.url);
        }
      } else {
        throw new Error('이미지 생성 실패')
      };

    } catch (e) {
      console.log(e);

    } finally {
      setIsImgLoading(false);
    }
  };

  const handleClickSelect = (imageInput: any) => {
    imageInput.current.click();
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImgUrl(URL.createObjectURL(file)); // 이미지 URL 생성

      const imgUrlData = await picklesRequests.createImgUrl(file);

      if (imgUrlData?.data.url) {
        setImgUrl(imgUrlData?.data.url);
      }
    }
  };

  return (
    <S.Container>
      <S.Text>대표 이미지를 설정해 주세요</S.Text>
      <S.ImgSelectContainer>
        <S.ImgContainer>
          {isImgLoading ? (
            <Spinner />
          ) : imgUrl ? (
            <S.Img src={imgUrl} />
          ) : (
            <S.ImgText>
              피클을 잘 나타내는
              <br /> 이미지를 선택해 주세요!
            </S.ImgText>
          )}
        </S.ImgContainer>
        <input type="file" accept="image/*" ref={imageInput} style={{ display: 'none' }} onChange={handleFileChange} />
        <S.SelectContainer disabled={isImgLoading} onClick={() => handleClickSelect(imageInput)}>
          <img src={SelectInLibraryIcon} />
          <S.SelectText>라이브러리에서 선택</S.SelectText>
        </S.SelectContainer>
        <S.SelectContainer disabled={isImgLoading} onClick={handleClickAI}>
          <img src={GenerateAIICon} />
          <S.SelectText>{isImgLoading ? 'AI로 생성 중...' : 'AI로 생성하기'}</S.SelectText>
        </S.SelectContainer>
      </S.ImgSelectContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    gap: 2rem;
  `,

  Text: styled.span`
    color: #292929;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,

  ImgContainer: styled.div`
    /* cursor: pointer; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 12.3rem;
    flex-shrink: 0;
    border-radius: 0.4rem;
    background: #d9d9d9;
  `,

  ImgText: styled.span`
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-weight: 500;
    font-style: normal;
    line-height: 120%;
  `,

  Img: styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
  `,

  ImgSelectContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  SelectContainer: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 4.5rem;
    flex-shrink: 0;
    border-radius: 0.4rem;
    background: #f3f4f6;
    gap: 1rem;
  `,

  SelectText: styled.span`
    color: #8b8d94;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
};
