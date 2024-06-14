import { useEffect, useRef, useState } from 'react';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import styled from '@emotion/styled';

export default function ShowImg() {
  const imageInput = useRef(null);
  const { imgUrl, file: globalFile , setFile } = usePickleCreation();
  console.log(imgUrl);
  const handleClick = (imageInput: any) => {
    imageInput.current.click();
  };

  // 로컬 이미지 선택
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file); // 이미지 URL 생성
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        name="file"
        ref={imageInput}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <S.Container onClick={() => handleClick(imageInput)}>
        {imgUrl ? (
          <S.Img src={imgUrl} alt="Selected" />
        ) : globalFile ? (
          <S.Img src={URL.createObjectURL(globalFile)} alt="Selected" />
        ) : (
          <S.Text>
            피클을 잘 나타내는
            <br /> 이미지를 선택해 주세요!
          </S.Text>
        )}
      </S.Container>
    </>
  );
}

const S = {
  Container: styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 12.3rem;
    flex-shrink: 0;
    border-radius: 0.4rem;
    background: #d9d9d9;
  `,

  Text: styled.span`
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-weight: 500;
    font-style: normal;
  `,

  Img: styled.img`
    width: 100%;
    height: 100%;
  `,
};
