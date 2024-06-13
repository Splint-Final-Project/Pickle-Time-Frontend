import styled from '@emotion/styled';

export default function Benefits() {
  return (
    <>
      <S.Title>구매 혜택</S.Title>
      <S.Wrap>
        리뷰 작성 시 포인트
        <S.Point>500P</S.Point>
      </S.Wrap>
    </>
  );
}

const S = {
  Title: styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.6rem;
    display: inline-block;
  `,
  Wrap: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 500;
  `,
  Point: styled.em`
    font-size: 1.6rem;
    font-weight: 500;
  `,
};
