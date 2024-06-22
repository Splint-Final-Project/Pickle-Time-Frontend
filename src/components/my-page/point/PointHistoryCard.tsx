import { formatYYMMDD } from '@/utils/formatData';
import styled from '@emotion/styled';

type PointHistoryCardProps = {
  date: Date;
  type: 'earn' | 'use';
  amount: number;
  remaining: number;
  message: string;
};

export default function PointHistoryCard({ date, type, amount, remaining, message }: PointHistoryCardProps) {
  const pointColor = type === 'earn' ? 'primary' : 'accent2';
  const sign = type === 'earn' ? ' + ' : ' - ';

  return (
    <S.Container>
      <S.Date>{formatYYMMDD(date)}</S.Date>
      <S.HistoryBox>
        <S.PointIcon color={pointColor}>P</S.PointIcon>
        <S.PointHistory color={pointColor}>
          <div className="point">
            {sign}
            {amount}P
          </div>
          <S.History>
            <div>{message}</div>
            <div
              style={{
                color: '#8b8d94',
              }}
            >
              총 {remaining} P
            </div>
          </S.History>
        </S.PointHistory>
      </S.HistoryBox>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    padding: 1.2rem 1.3rem 1.8rem;
    border-radius: 1.5rem;
    border: 0.8px solid ${({ theme }) => theme.color.line};
  `,

  Date: styled.span`
    ${({ theme }) => theme.typography.detail};
  `,

  HistoryBox: styled.div`
    display: flex;
    align-items: center;
    gap: 1.4rem;
    margin-top: 1.3rem;
  `,

  PointIcon: styled.div<{ color: 'primary' | 'accent2' }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 3rem;
    height: 3rem;
    border-radius: 99rem;
    border: 1.8px solid #8b8d94;
    padding-top: 0.3rem;

    color: ${({ theme, color }) => theme.color[color]};
    font-size: 1.7rem;
    font-weight: 700;
    line-height: normal;
  `,

  PointHistory: styled.div<{ color: 'primary' | 'accent2' }>`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;

    & .point {
      color: ${({ theme, color }) => theme.color[color]};
      ${({ theme }) => theme.typography.subTitle4};
    }
  `,

  History: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${({ theme }) => theme.typography.detail};
  `,
};
