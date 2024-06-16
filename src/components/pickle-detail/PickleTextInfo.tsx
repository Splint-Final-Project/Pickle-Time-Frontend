import { When } from '@/apis/types/pickles.type';
import { formatCurrency, formatDays, formatPeriod, formatTimeRange } from '@/utils/formatData';
import styled from '@emotion/styled';
import { useMemo } from 'react';

interface PickleTextInfoProps {
  when: When;
  location: string;
  capacity: number;
  cost: number;
}

export default function PickleTextInfo({ when, location, capacity, cost }: PickleTextInfoProps) {
  const days = useMemo(() => formatDays(when), [when]);
  const time = useMemo(() => formatTimeRange(when), [when]);
  const period = useMemo(() => formatPeriod(when), [when]);

  return (
    <S.Container>
      <S.Row className="date">
        <img src="/icons/timeIcon.svg" />
        <S.Text>
          <span>{period}</span>
          <span className="time">{time}</span>
          <span>{days}</span>
        </S.Text>
      </S.Row>
      <S.Row>
        <img src="/icons/locationIcon.svg" />
        <S.Text>
          <span>{location}</span>
          <span>도로명주소</span>
        </S.Text>
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

  Text: styled.div`
    display: flex;
    flex-direction: column;

    & .time {
      margin: 0.4rem 0 0.8rem;
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.detail};
    }
  `,
};
