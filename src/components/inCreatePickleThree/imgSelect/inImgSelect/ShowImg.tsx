import { useEffect, useRef, useState } from 'react';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import styled from '@emotion/styled';

export default function ShowImg() {
  const imageInput = useRef(null);
  const { imgUrl, setImgUrl } = usePickleCreation();

  const handleClick = (imageInput: any) => {
    imageInput.current.click();
  };

  // 로컬 이미지 선택
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImgUrl(URL.createObjectURL(file)); // 이미지 URL 생성
    }
  };

  return (
    <>
      <input type="file" accept="image/*" ref={imageInput} style={{ display: 'none' }} onChange={handleFileChange} />
      <S.ImgContainer>
        {imgUrl ? (
          <S.Img src={imgUrl} />
        ) : (
          <S.ImgText>
            피클을 잘 나타내는
            <br /> 이미지를 선택해 주세요!
          </S.ImgText>
        )}
      </S.ImgContainer>
    </>
  );
}

const S = {
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
  `,

  Img: styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
  `,
};
