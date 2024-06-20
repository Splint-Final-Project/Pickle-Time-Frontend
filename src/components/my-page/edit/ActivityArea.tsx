import { map } from '@/constants/areas';
import styled from '@emotion/styled';

export default function ActivityArea({ areaCodes }) {
  return (
    <S.ActivityArea>
      {areaCodes.map(code => {
        const item = map.get(code);
        return (
          <S.Area key={code}>
            <span>{item.si + ' ' + item.gu}</span>
            <img src="/icons/x.svg" alt="삭제" />
          </S.Area>
        );
      })}
    </S.ActivityArea>
  );
}

const S = {
  ActivityArea: styled.div`
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
  `,

  Area: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    white-space: nowrap;

    padding: 0.8rem;
    border-radius: 0.4rem;
    border: 1px solid ${({ theme }) => theme.color.primary};

    span {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: normal;
      color: ${({ theme }) => theme.color.primary};
    }

    img {
      cursor: pointer;
    }
  `,
};
