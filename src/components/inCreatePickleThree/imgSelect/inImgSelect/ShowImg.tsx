import styled from '@emotion/styled';

export default function ShowImg({handler}: {handler: () => void}) {
  return (
    <S.Container onClick={handler}>
      <S.Text>
        피클을 잘 나타내는
        <br /> 이미지를 선택해 주세요!
      </S.Text>
    </S.Container>
  );
}

const S = {
  Container: styled.button`
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
};
