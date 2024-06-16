import { When } from '@/apis/types/pickles.type';
import { formatCurrency, formatDays, formatPeriod, formatTimeRange } from '@/utils/formatData';
import styled from '@emotion/styled';
import { useMemo } from 'react';

export default function PickleTextInfo({
  when,
  place,
  address,
  detailedAddress,
  capacity,
  cost,
}: {
  when: When;
  place: string;
  address: string;
  detailedAddress: string;
  capacity: number;
  cost: number;
}) {
  const date = formatPeriod(when);
  const time = formatTimeRange(when);
  const days = formatDays(when);
  return (
    <S.Container>
      <S.Row className="date">
        <img src="/icons/timeIcon.svg" />
        <S.Text>
          <span>{date}</span>
          <span className="time">{time}</span>
          <span>{days}</span>
        </S.Text>
      </S.Row>
      <S.Row>
        <img src="/icons/locationIcon.svg" />
        <S.Text>
          <span>{place}</span>
          <span>
            {address} ({detailedAddress})
          </span>
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
