import usePickleCreation from "@/hooks/zustand/usePickleCreation"

import ShowImg from "./inImgSelect/ShowImg";
import SelectInLibrary from "./inImgSelect/SelectInLibrary";
import GenerateAI from "./inImgSelect/GenerateAI";

import styled from '@emotion/styled';

export default function ImgSelect() {

  return (
    <S.Container>
      <S.Text>대표 이미지를 설정해 주세요</S.Text>
      <S.ImgSelectContainer>
        <ShowImg/>
        <SelectInLibrary/>
        <GenerateAI/>
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
