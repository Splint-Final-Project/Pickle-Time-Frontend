import { formatDays, formatPeriod, formatTimeRange } from '@/utils/formatData';
import styled from '@emotion/styled';

interface PicklePreviewCardProps {
  data: {
    category: string;
    imgUrl: string;
    title: string;
    cost: number;
    capacity: number;
    when: any;
  };
  type: 'create' | 'join';
}
export default function PicklePreviewCard({ data, type }: PicklePreviewCardProps) {
  const date = formatPeriod(data?.when);
  const time = formatTimeRange(data?.when);
  const days = formatDays(data?.when);

  return (
    <>
      <S.Title>{type === 'create' ? '생성할 피클을 확인해주세요.' : '신청할 피클을 확인해주세요.'}</S.Title>
      <S.Figures>
        <S.Figure>
          {data.title}
          <span>{data.category}</span>
        </S.Figure>
        <S.Figure>
          <S.FigureImgWrap>
            <S.FigureImg src={data.imgUrl} alt="피클 이미지" />
          </S.FigureImgWrap>
          <S.Figcaption>
            <S.FigureContent>{date}</S.FigureContent>
            <S.FigureContent>{time}</S.FigureContent>
            <S.FigureContent>{type === 'create' ? `${data.capacity}명 | ${days}` : `${days}`}</S.FigureContent>
            <S.FigureContent>
              <strong>{data.cost.toLocaleString()}</strong>원
            </S.FigureContent>
          </S.Figcaption>
        </S.Figure>
      </S.Figures>
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
  Figures: styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 1px solid #d0d0d0;
  `,
  Figure: styled.figure`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1.6rem;
    padding: 10px;
    :nth-of-type(1) {
      border-bottom: 1px solid #d0d0d0;
    }
    font-size: 1.4rem;
    font-weight: 500;
    span {
      font-size: 1.3rem;
      font-weight: 400;
    }
  `,
  FigureImgWrap: styled.div`
    width: 12rem;
    height: 8rem;
  `,
  FigureImg: styled.img`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  `,
  Figcaption: styled.figcaption`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    color: #292929;
    font-weight: 500;
  `,
  FigureContent: styled.p`
    &:first-of-type {
      font-size: 1.6rem;
    }
    &:nth-of-type(2) {
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: #8b8d94;
      line-height: 1.4rem;
    }

    &:nth-of-type(3) {
      font-size: 1.2rem;
    }
    strong {
      font-size: 1.5rem;
      font-weight: 600;
    }
    /* span {
      color: #8b8d94;
      font-size: 1.3rem;
      line-height: 1.4rem;
    } */
  `,
};
