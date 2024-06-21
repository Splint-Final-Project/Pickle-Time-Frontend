import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import CardBackImg from '@/assets/images/todayPickleCardBackImg.svg';
import ClockIcon from '@/assets/icons/ClockIcon';
import AddressIcon from '@/assets/icons/AddressIcon';
import Character from '@/assets/icons/character.svg';

import { formatTime } from '@/utils/dateCalculate';
import { TodayPickleDataType } from './TodayPickleListContainer';
import { getTimeGapMessage, untilChulseok, calculateInterval } from '@/utils/todayPickleCardUtils';

type Time = {
  times: Date[];
  startDate: any;
  finishDate: any;
  startTime: any;
  finishTime: any;
  selectedDays: any;
}

type CardDataType = {
  title: string;
  finishDate: string;
  when: Time;
  time: string;
  startTime: string;
  place: string;
  detailAddress: string;
  isNearby?: boolean;
};


interface TodayPickleCardProps {
  cardData: TodayPickleDataType;
  distance: number;
}

export default function TodayPickleCard({ cardData }: any) {
  // format
  const finishDateFormat = `~${cardData?.when.finishDate.month.toString().padStart(2, '0')}.${cardData?.when.finishDate.day}`
  const startTimeFormat = formatTime(cardData?.when.startTime);
  const finishTimeFormat = formatTime(cardData?.when.finishTime);
  const timeFormat = `${startTimeFormat}~${finishTimeFormat}`

  return (
    <S.CardContainer>
      <S.Character />
      <S.Card>
        <S.CardHeader>
          <S.HeaderWrap>
            <S.CardLogo>오늘의 피클 타임</S.CardLogo>
            <S.FinishDate>{finishDateFormat}</S.FinishDate>
          </S.HeaderWrap>
          <S.CardTitle>{cardData?.title}</S.CardTitle>
        </S.CardHeader>
        <S.CardBody>
          <S.AlertMessage>
            {untilChulseok(
              { hour: cardData?.when.startTime.hour, minute: cardData?.when.startTime.minute}, 
              { hour: cardData?.when.finishTime.hour, minute: cardData?.when.finishTime.minute}
            )}
          </S.AlertMessage>
          <S.PickleTime>
            <S.IconBox>
              <ClockIcon />
            </S.IconBox>
            <span>{timeFormat}</span>
          </S.PickleTime>
          {/* {cardData?.isNearby && <S.AlertMessage>! 1km 남았어요</S.AlertMessage>} */}
          <S.PickleAddress>
            <S.IconBox>
              <AddressIcon />
            </S.IconBox>
            <span>
              {cardData?.place} <br />
              <S.RestAddress>{cardData?.detailAddress}</S.RestAddress>
            </span>
          </S.PickleAddress>
        </S.CardBody>
      </S.Card>
    </S.CardContainer>
  );
}

const S = {
  CardContainer: styled.div`
    position: relative;
    width: 100%;
    margin: auto;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;

    &::before {
      content: '';
      width: 32.5rem;
      height: 8.9rem;
      background: #dedede;
      border-radius: 0.7rem;
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
    }
  `,
  Character: styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    background-image: url(${Character});
    background-repeat: no-repeat;
    background-size: contain;
    top: -2.1rem;
    left: 1.5rem;
    z-index: 200;
  `,
  Card: styled.div`
    padding: 2.8rem 2.5rem;
    background-image: url(${CardBackImg});
    background-repeat: no-repeat;
    background-size: contain;
    color: #fff;
    width: 100%;
    min-height: 23.4rem;
    position: relative;
    z-index: 100;
  `,
  CardHeader: styled.div`
    margin-bottom: 2.7rem;
  `,
  HeaderWrap: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  `,
  CardLogo: styled.span`
    font-size: 1.6rem;
    color: #3ea24e;
  `,
  FinishDate: styled.span`
    font-size: 1.4rem;
    color: #8b8d94;
  `,
  CardTitle: styled.h2`
    font-size: 2rem;
    font-weight: 600;
  `,
  CardBody: styled.div`
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  AlertMessage: styled.span<{ $arrive?: Boolean }>`
    color: ${({ $arrive }) => ($arrive ? '#FFD66D' : '#f66')};
  `,
  PickleTime: styled.p`
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-style: normal;
  `,
  IconBox: styled.span`
    display: inline-block;
    height: 1.6rem;
  `,
  PickleAddress: styled.p`
    display: flex;
    gap: 0.8rem;
  `,
  RestAddress: styled.span`
    display: inline-block;
    margin-top: 0.5rem;
    color: #b5b5b5;
  `,
};
