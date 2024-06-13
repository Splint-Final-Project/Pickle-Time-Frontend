import styled from '@emotion/styled';

interface PicklePreviewCardProps {
  data: {
    category: string;
    imgUrl: string;
    title: string;
    price: number;
  };
  type: 'create' | 'application';
}
export default function PicklePreviewCard({ data, type }: PicklePreviewCardProps) {
  return (
    <>
      <S.Title>{type === 'create' ? '생성할 피클을 확인해주세요.' : '신청할 피클을 확인해주세요.'}</S.Title>
      <S.Category>{data.category}</S.Category>
      <S.Figure>
        <S.FigureImgWrap>
          <S.FigureImg src={data.imgUrl} />
        </S.FigureImgWrap>
        <S.Figcaption>
          <S.FigureContent>{data.title}</S.FigureContent>
          <S.FigureContent>
            06/01 - 09/01 <span>01 : 00pm ~ 05 : 00pm</span>
          </S.FigureContent>
          <S.FigureContent>8명 | 월, 목</S.FigureContent>
          <S.FigureContent>
            <strong>{data.price.toLocaleString()}</strong>원
          </S.FigureContent>
        </S.Figcaption>
      </S.Figure>
    </>
  );
}

const S = {
  Title: styled.span`
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 600;
    color: #292929;
    margin-bottom: 1.6rem;
  `,
  Category: styled.div`
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  `,
  Figure: styled.figure`
    border-radius: 4px;
    display: flex;
    gap: 1.6rem;
  `,
  FigureImgWrap: styled.div`
    width: 10rem;
    height: 10rem;
  `,
  FigureImg: styled.img`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  `,
  Figcaption: styled.figcaption`
    flex: 1;
    color: #292929;
    font-weight: 500;
  `,
  FigureContent: styled.p`
    &:first-child {
      font-size: 1.8rem;
      margin-bottom: 0.8rem;
    }
    &:nth-child(2) {
      font-size: 1.4rem;
      margin-bottom: 0.6rem;
    }

    &:nth-child(3) {
      font-size: 1.4rem;
      margin-bottom: 0.6rem;
    }
    strong {
      font-size: 1.8rem;
      font-weight: 700;
    }
    span {
      color: #8b8d94;
      font-size: 1.3rem;
      margin-bottom: 0.4rem;
      margin-left: 0.8rem;
    }
  `,
};
