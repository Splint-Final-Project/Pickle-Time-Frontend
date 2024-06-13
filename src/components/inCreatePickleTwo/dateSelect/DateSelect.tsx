import Timer from './inDateSelect/Timer';
// import Dater from './inDateSelect/Dater';
import DateButtonList from './inDateSelect/DateButtonList';
import styled from '@emotion/styled';
import { useDateSelect } from '@/hooks/zustand/useDateSelect';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

export default function DateSelect() {
  const { startDate, finishDate, startTime, finishTime, setStartDate, setFinishDate, setStartTime, setFinishTime } =
    useDateSelect();
  const d = new Date();
  const year = d.getFullYear(); // 년
  const month = d.getMonth(); // 월
  const day = d.getDate(); // 일

  return (
    <S.Container>
      <S.Text>일정을 선택해 주세요</S.Text>
      {/* <Dater date={startDate} setDate={setStartDate}>시작 날짜</Dater>
      <Dater date={finishDate} setDate={setFinishDate}>종료 날짜</Dater> */}

      <DateRangePicker
        onChange={(e: any) => {
          setStartDate({
            year: e[0].getFullYear(),
            month: e[0].getMonth() + 1,
            day: e[0].getDate(),
          });
          setFinishDate({
            year: e[1].getFullYear(),
            month: e[1].getMonth() + 1,
            day: e[1].getDate(),
          });
        }}
        value={[
          new Date(startDate.year, startDate.month - 1, startDate.day),
          new Date(finishDate.year, finishDate.month - 1, finishDate.day),
        ]}
        calendarProps={{
          // activeStartDate: new Date(year, month, day + 7),
          // defaultActiveStartDate: new Date(year, month, day + 7),
          minDate: new Date(year, month, day + 7),
        }}
      />
      <DateButtonList>요일</DateButtonList>
      <Timer time={startTime} setTime={setStartTime}>
        시작 시간
      </Timer>
      <Timer time={finishTime} setTime={setFinishTime}>
        종료 시간
      </Timer>
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
  `,
};
