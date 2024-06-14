// @ts-nocheck

import Timer from './inDateSelect/Timer';
// import Dater from './inDateSelect/Dater';
import DateButtonList from './inDateSelect/DateButtonList';
import styled from '@emotion/styled';
import { useDateSelect } from '@/hooks/zustand/useDateSelect';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

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
      <DateRange
        color="#000000"
        date={new Date()}
        locale={locales.ko.ko}
        rangeColors={['#5DC26D', '#000000']}
        editableDateInputs={false}
        showDateDisplay={false}
        moveRangeOnFirstSelection={false}
        direction="horizontal"
        dateDisplayFormat="yyyy.MM.dd"
        displayMode="dateRange"
        // showMonthAndYearPickers={false}
        // showMonthArrow={false}
        months={window.innerWidth <= 767 ? 1 : 2}
        minDate={new Date(year, month, day + 7)}
        ranges={[
          {
            startDate: startDate.year ? new Date(startDate.year, startDate.month - 1, startDate.day) : null,
            endDate: finishDate.year ? new Date(finishDate.year, finishDate.month - 1, finishDate.day) : null,
            key: 'selection',
          },
        ]}
        onChange={(item: any) => {
          setStartDate({
            year: item.selection.startDate.getFullYear(),
            month: item.selection.startDate.getMonth() + 1,
            day: item.selection.startDate.getDate(),
          });
          setFinishDate({
            year: item.selection.endDate.getFullYear(),
            month: item.selection.endDate.getMonth() + 1,
            day: item.selection.endDate.getDate(),
          });
        }}
      />
      <DateButtonList>요일</DateButtonList>
      <Timer time={startTime} setTime={setStartTime}>
        시작 시각
      </Timer>
      <Timer time={finishTime} setTime={setFinishTime}>
        종료 시각
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
