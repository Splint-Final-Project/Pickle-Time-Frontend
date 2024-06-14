import { useRef } from 'react';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import SelectInLibraryIcon from '/icons/selectInLibrary.svg';
import styled from '@emotion/styled';

export default function SelectInLibrary() {
  const { setFile } = usePickleCreation();
  const imageInput = useRef(null);

  const handleClick = (imageInput: any) => {
    imageInput.current.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setFile(file); // 이미지 URL 생성
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={imageInput}
        name="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <S.Container onClick={() => handleClick(imageInput)}>
        <img src={SelectInLibraryIcon} />
        <S.Text>라이브러리에서 선택</S.Text>
      </S.Container>
    </>
  );
}

const S = {
  Container: styled.button`
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

  Text: styled.span`
    color: #8b8d94;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
};
