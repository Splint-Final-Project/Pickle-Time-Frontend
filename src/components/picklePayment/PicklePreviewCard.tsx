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
  // const { day, time, date } = summaryParse(data.summary);

  // console.log(time);
  let days = '';
  ['일', '월', '화', '수', '목', '금', '토'].forEach((day, index) => {
    if (data.when.selectedDays.includes(index)) {
      if (days === '') {
        days += day;
      } else {
        days += ', ' + day;
      }
    }
  });
  let time = '';
  time +=
    ('0' + data.when.startTime.hour).slice(-2) +
    ':' +
    ('0' + data.when.startTime.minute).slice(-2) +
    ' ~ ' +
    ('0' + data.when.finishTime.hour).slice(-2) +
    ':' +
    ('0' + data.when.finishTime.minute).slice(-2);
  let date = '';
  date +=
    data.when.startDate.month +
    '월 ' +
    data.when.startDate.day +
    '일 ~ ' +
    data.when.finishDate.month +
    '월 ' +
    data.when.finishDate.day +
    '일';

  return (
    <>
      <S.Title>{type === 'create' ? '생성할 피클을 확인해주세요.' : '신청할 피클을 확인해주세요.'}</S.Title>
      {/* <S.Category>{data.category}</S.Category> */}
      <S.Figure>
        <S.FigureImgWrap>
          <S.FigureImg src={data.imgUrl} alt="피클 이미지" />
        </S.FigureImgWrap>
        <S.Figcaption>
          <S.FigureContent>{data.title}</S.FigureContent>
          <S.FigureContent>
            {date} <span>{time}</span>
          </S.FigureContent>
          <S.FigureContent>{type === 'create' ? `${data.capacity}명 | ${days}` : `${days}`}</S.FigureContent>
          <S.FigureContent>
            <strong>{data.cost.toLocaleString()}</strong>원
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    color: #292929;
    font-weight: 500;
  `,
  FigureContent: styled.p`
    &:first-child {
      font-size: 1.8rem;
    }
    &:nth-child(2) {
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    &:nth-child(3) {
      font-size: 1.4rem;
    }
    strong {
      font-size: 1.8rem;
      font-weight: 700;
    }
    span {
      color: #8b8d94;
      font-size: 1.3rem;
      line-height: 1.4rem;
    }
  `,
};
