import usePickleCreation from "@/hooks/zustand/usePickleCreation"

import ShowImg from "./inImgSelect/ShowImg";
import HowToSelectImg from "./inImgSelect/HowToSelectImg";
import { selectInLibrary, takePhoto, drawImg } from "./handlers";

import SelectInLibraryIcon from "/icons/selectInLibrary.svg";
import TakePhotoIcon from "/icons/takePhoto.svg";

import styled from '@emotion/styled';

const HOW_TO_SELECT = [
  { id: 1, how: "라이브러리에서 선택", src: SelectInLibraryIcon, handler: selectInLibrary},
  { id: 2, how: "사진 찍기", src: TakePhotoIcon, handler: takePhoto},
  { id: 3, how: "AI 생성 (Beta)", src: TakePhotoIcon, handler: drawImg},
]

export default function ImgSelect() {

  return (
    <S.Container>
      <S.Text>대표 이미지를 설정해 주세요</S.Text>
      <S.ImgSelectContainer>
        <ShowImg handler={selectInLibrary}/>
        {HOW_TO_SELECT.map(howTo => (
          <HowToSelectImg key={howTo.id} src={howTo.src} handler={howTo.handler}>{howTo.how}</HowToSelectImg> 
        ))}
      </S.ImgSelectContainer>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 3rem 0;
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

  ImgSelectContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `
};
