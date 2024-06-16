// @ts-nocheck
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import styled from '@emotion/styled';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function Gigan() {
  const d = new Date();
  const year = d.getFullYear(); // 년
  const month = d.getMonth(); // 월
  const day = d.getDate(); // 일
  const [isCalanderOpen, setIsCalanderOpen] = useState(false);
  const { when, setStartDate, setFinishDate } = usePickleCreation();
  const { startDate, finishDate } = when;
  return (
    <>
      <S.SubText onClick={() => setIsCalanderOpen(prev => !prev)}>
        기간
        <S.DateField>
          {startDate.year +
            '/' +
            startDate.month +
            '/' +
            startDate.day +
            ' - ' +
            finishDate.year +
            '/' +
            finishDate.month +
            '/' +
            finishDate.day}
        </S.DateField>
      </S.SubText>
      {isCalanderOpen && (
        <DateRange
          color="#000000"
          date={new Date()}
          locale={locales.ko.ko}
          rangeColors={['#5DC26D', '#000000']}
          editableDateInputs={false}
          showDateDisplay={false}
          moveRangeOnFirstSelection={false}
          dateDisplayFormat="yyyy.MM.dd"
          displayMode="dateRange"
          scroll={{
            enabled: true,
          }}
          showMonthAndYearPickers={false}
          showMonthArrow={false}
          months={window.innerWidth <= 767 ? 1 : 2}
          direction={window.innerWidth <= 767 ? 'vertical' : 'horizontal'}
          minDate={new Date(year, month, day + 8)}
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
            if (item.selection.startDate.getDate() !== item.selection.endDate.getDate()) {
              setIsCalanderOpen(false);
            }
          }}
        />
      )}
    </>
  );
}

const S = {
  SubText: styled.span`
    cursor: pointer;
    color: var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 120.983%; /* 16.938px */
  `,
  DateField: styled.div`
    color: black;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px solid #d0d0d0;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    &:focus {
      border-bottom-color: #045905;
    }
    ::placeholder {
      color: var(--Input-Text, #bababa);
    }
  `,
};
