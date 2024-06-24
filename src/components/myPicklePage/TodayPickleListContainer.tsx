import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import toast from 'react-hot-toast';
import Tilt from 'react-parallax-tilt';
import client from '@/apis/axios';
import { useQueryClient } from '@tanstack/react-query';

import PagenationBar from './PagenationBar';
import TodayPickleCard from './TodayPickleCard';
import { When } from '@/apis/types/pickles.type';
import { isButtonActive, calculateInterval } from '@/utils/todayPickleCardUtils';
import { useGetProceedingPickles } from '@/hooks/query/pickles';
import { useGeolocation } from '@/hooks/useGeolocation';
import Character from '/icons/character.svg';

export interface TodayPickleDataType {
  capacity: number;
  category: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
  deadLine: string;
  explanation: string;
  goals: string[];
  imgUrl: string;
  isCancelled: boolean;
  latitude: number;
  longtitude: number;
  leader: string;
  like: number;
  place: string;
  participantNumber: number;
  title: string;
  viewCount: number;
  when: When;
  address: string;
  detailedAddress: string;
  id: string;
}

export default function TodayPickleListContainer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const { location } = useGeolocation();
  const queryClient = useQueryClient();

  const { data } = useGetProceedingPickles();

  const currentPage = Number(searchParams.get('page')) || 1;

  const attended = useMemo(() => {
    return data?.todayPickles[currentPage - 1]?.attendance.find((item: any) => {
      const date = new Date(item);
      return date.getDate() === currentTime.getDate() && date.getMonth() === currentTime.getMonth();
    });
  }, [data?.todayPickles, currentPage, currentTime]);

  const handleAttendance = async (id: string) => {
    if (!location) return toast.error('위치 정보를 가져오는 중입니다. 잠시만 기다려주세요.');
    try {
      const res = await client.post(`/pickle/${id}/attendance`, {
        latitude: location?.latitude,
        longitude: location?.longitude,
      });
      queryClient.invalidateQueries({ queryKey: ['pickles', 'proceeding'] });
      toast.success(res.data.message);
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentTime(new Date());
      },
      calculateInterval(
        currentTime,
        {
          hour: data?.todayPickles[currentPage - 1]?.when.startTime.hour,
          minute: data?.todayPickles[currentPage - 1]?.when.startTime.minute,
        },
        {
          hour: data?.todayPickles[currentPage - 1]?.when.finishTime.hour,
          minute: data?.todayPickles[currentPage - 1]?.when.finishTime.minute,
        },
      ),
    );

    return () => clearInterval(interval);
  }, [currentTime]);

  if (!data?.todayPickles || data?.todayPickles.length === 0) {
    return (
      <S.Container $margin>
        <Tilt>
        <S.CardContainer>
          <S.Card>
            <S.Character />
            <S.NotTodayPickleMessage>오늘의 피클이 없어요!</S.NotTodayPickleMessage>
          </S.Card>
        </S.CardContainer>
        </Tilt>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <PagenationBar totalDataCount={data?.todayPickles.length} />
      <Tilt>
        <TodayPickleCard cardData={data?.todayPickles[currentPage - 1]} distance={0} />
      </Tilt>
      <S.AttendanceButton
        onClick={() => handleAttendance(data?.todayPickles[currentPage - 1].id)}
        disabled={
          !isButtonActive(
            data?.todayPickles[currentPage - 1].when.startTime.hour,
            data?.todayPickles[currentPage - 1].when.startTime.minute,
          ) || attended
        }
      >
        <span>{attended ? '출석완료' : '출석하기'}</span>
      </S.AttendanceButton>
    </S.Container>
  );
}

const S = {
  Container: styled.div<{ $margin?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 34.4rem;
    margin: auto;
    ${({ $margin }) =>
      $margin &&
      css`
        margin-top: 2.4rem;
      `}
  `,
  AttendanceButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 1rem 0;
    border-radius: 0.4rem;
    background: #5dc26d;
    color: #fff;
    font-size: 1.4rem;

    &:disabled {
      background: #d0d0d0;
      color: #8b8d94;
      cursor: auto;
    }
  `,
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
    top: -2.1rem;
    left: 1.5rem;
    z-index: 200;

    width: 50px;
    height: 50px;
    background-image: url(${Character});
    background-repeat: no-repeat;
    background-size: contain;
  `,
  Card: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 100;

    width: 100%;
    min-height: 23.4rem;
    padding: 2.8rem 2.5rem;
    background-image: url('/images/todayPickleCardBackImg.svg');
    background-repeat: no-repeat;
    background-size: contain;
    color: #fff;
  `,

  NotTodayPickleMessage: styled.span`
    ${({ theme }) => theme.typography.subTitle1}
  `,
};
