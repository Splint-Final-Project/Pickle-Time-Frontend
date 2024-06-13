import GenerateAIICon from "/icons/generateAI.svg";
import styled from '@emotion/styled';

export default function GenerateAI() {

  const handleClick = () => {
  }

  return (
    <S.Container onClick={handleClick}>
      <img src={GenerateAIICon}/>
      <S.Text>라이브러리에서 선택</S.Text>
    </S.Container>
  )
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
    background: #F3F4F6;
    gap: 1rem;
  `,

  Text: styled.span`
    color: #8B8D94;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `
}