import Timer from './inDatePicker/Timer';
import Dater from './inDatePicker/Dater';
import DateButtonList from './inDatePicker/DateButtonList';
import styled from '@emotion/styled';

export default function DatePicker() {
  return (
    <S.Container>
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
    gap: 2em;
  `,
};
