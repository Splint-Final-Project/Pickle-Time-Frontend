// import styled from '@emotion/styled';
// import { useHandleTimeWithWheel } from './hooks';

// interface TimeTextProps {
//   minTime: number;
//   maxTime: number;
// }

// export default function TimeInTimer({ minTime, maxTime }: TimeTextProps) {
//   const { getAdjacentTime, containerRef } = useHandleTimeWithWheel(minTime, maxTime);

//   return (
//     <S.Container ref={containerRef}>
//       <S.TimeText>
//         <S.TimeItem isCurrent={false}>{getAdjacentTime(-1)}</S.TimeItem>
//         <S.TimeItem isCurrent={true}>{getAdjacentTime(0)}</S.TimeItem>
//         <S.TimeItem isCurrent={false}>{getAdjacentTime(1)}</S.TimeItem>
//       </S.TimeText>
//     </S.Container>
//   );
// }

// const S = {
//   Container: styled.div`
//     flex: 1 1 auto;
//     overflow: hidden;
//     height: 6rem;
//     display: flex;
//     align-items: center;
//   `,

//   TimeText: styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 0.3rem;
//   `,

//   TimeItem: styled.span<{ isCurrent: boolean }>`
//     color: ${({ isCurrent }) => (isCurrent ? '#000' : '#BABABA')};
//     font-family: Pretendard;
//     font-size: 2.4rem;
//     font-weight: 600;
//     font-style: normal;
//     line-height: normal;
//   `,
// };
