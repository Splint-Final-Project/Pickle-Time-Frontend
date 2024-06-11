import Timer from './inDatePicker/Timer';
import Dater from './inDatePicker/Dater';
import DateButtonList from './inDatePicker/DateButtonList';
import styled from '@emotion/styled';

export default function DatePicker() {
  return (
    <S.Container>
      <S.Text>일정을 선택해 주세요</S.Text>
      <Dater>시작 날짜</Dater>
      <Dater>종료 날짜</Dater>
      <DateButtonList>요일</DateButtonList>
      <Timer>시작 시간</Timer>
      <Timer>종료 시간</Timer>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 3rem 0;
    gap: 2.3rem;
  `,
  
  Text: styled.span`
    color: #292929;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `
};
