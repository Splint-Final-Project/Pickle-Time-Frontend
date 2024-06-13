import { When } from '@/apis/types/pickles.type';
import { formatCurrency } from '@/utils/formatData';
import styled from '@emotion/styled';

interface PickleTextInfoProps {
  when: When;
  location: string;
  capacity: number;
  cost: number;
}

export default function PickleTextInfo({ when, location, capacity, cost }: PickleTextInfoProps) {
  return (
    <S.Container>
      <S.Row className="date">
        <img src="/icons/timeIcon.svg" />
        <S.DateTime>
          <span>기간</span>
          <span className="time">시간</span>
          <span>요일</span>
        </S.DateTime>
      </S.Row>
      <S.Row>
        <img src="/icons/locationIcon.svg" />
        <span>{location}</span>
      </S.Row>
      <S.Row>
        <img src="/icons/groupIcon.svg" />
        <span>{capacity}명</span>
      </S.Row>
      <S.Row>
        <img src="/icons/costIcon.svg" />
        <span className="cost">{formatCurrency(cost)}원</span>
      </S.Row>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    ${({ theme }) => theme.typography.body1}
  `,

  Row: styled.div`
    display: flex;
    align-items: center;
    gap: 1.3rem;

    & .date {
      align-items: flex-end;
    }

    & .cost {
      color: ${({ theme }) => theme.color.primary};
    }
  `,

  DateTime: styled.div`
    display: flex;
    flex-direction: column;

    & .time {
      margin: 0.4rem 0 0.8rem;
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.detail};
    }
  `,
};
