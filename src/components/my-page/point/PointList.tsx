import styled from '@emotion/styled';
import PointHistoryCard from '@/components/my-page/point/PointHistoryCard';
import { MyDynamicTemplate } from '@/styles/commonStyles';
import { useMyPoints } from '@/hooks/query/points';
import { useEffect } from 'react';
import EmptyDataMessage from '@/components/common/EmptyDataMessage';

export default function PointList() {
  const { data } = useMyPoints();
  const pointsData = data?.data || [];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tenor.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Apply CSS to hide interactive elements after the script is loaded
    const style = document.createElement('style');
    style.textContent = `
      .tenor-gif-embed iframe {
        pointer-events: none; /* Disable all interactions */
      }
      .tenor-gif-embed .tenor-embed-logo {
        display: none; /* Hide the logo */
      }
      .tenor-gif-embed .tenor-embed-share {
        display: none; /* Hide the share buttons */
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <MyDynamicTemplate>
      <h2>보유 포인트</h2>
      <S.PointWrapper>
        <S.PointGif
          className="tenor-gif-embed"
          data-postid="19642352"
          data-share-method="host"
          data-aspect-ratio="1.33333"
          // data-width="100%"
        ></S.PointGif>
        <S.PointNum>{pointsData?.points || 0}P</S.PointNum>
      </S.PointWrapper>
      <S.Notice>
        <span>포인트 안내 사항을 확인해 보세요!</span>
        <img src="/icons/rightArrowIcon.svg" alt="더보기" />
      </S.Notice>
      {pointsData ? (
        <S.PointHistoryList>
          {(pointsData?.history || []).map((history: any, index: number) => (
            <PointHistoryCard
              key={index}
              date={history.date}
              type={history.type}
              remaining={history.remaining}
              amount={history.amount}
              message={history.message}
            />
          ))}
        </S.PointHistoryList>
      ) : (
        <EmptyDataMessage>현재 보유중인 포인트가 없어요!</EmptyDataMessage>
      )}
    </MyDynamicTemplate>
  );
}

const S = {
  Notice: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1.5rem 1.7rem;
    margin: 1.7rem 0 1.3rem;
    border-radius: 1.5rem;
    background-color: ${({ theme }) => theme.color.secondary2};

    span {
      ${({ theme }) => theme.typography.body1};
    }

    img {
      cursor: pointer;
    }
  `,

  PointHistoryList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
  `,

  PointWrapper: styled.div`
    display: flex;
  `,
  PointGif: styled.div`
    width: 4rem;
    height: 4rem;
    margin-top: 0.57rem;
    margin-right: -0.5rem;
    margin-left: -0.5rem;
    z-index: 0;
  `,
  PointNum: styled.h1`
    z-index: 9;
  `,
};
