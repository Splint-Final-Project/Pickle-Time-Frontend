import styled from '@emotion/styled';
import PagenationBar from './PagenationBar';
import TodayPickleCard from './TodayPickleCard';
import Tilt from 'react-parallax-tilt';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { isButtonActive } from '@/utils/todayPickleCardUtils';
import betweenLength from '@/utils/betweenLength';
import { When } from '@/apis/types/pickles.type';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [distance, setDistance] = useState(0);

  const currentPage = useMemo(() => {
    return Number(searchParams.get('page')) || 1;
  }, [searchParams]);
  const queryClient = useQueryClient();

  const pickleData: any = queryClient.getQueryData(['pickles', 'proceeding']);
  const todayPickles = pickleData?.todayPickles;

  const handleAttendance = () => {
    // alert(`${location?.longitude} ,${location?.latitude}`);
    //TODO : 출석을 누르면 경도 위도를 POST로 보내어 출석을 한다.
  };

  useEffect(() => {
    const getDistance = async () => {
      const distance = await betweenLength({ latitude: 37.5547, longitude: 126.9706 });
      setDistance(distance);
    };
    getDistance();
  }, [currentPage]);

  return (
    <S.Container>
      <PagenationBar totalDataCount={TEST_DATA?.length} />
      <Tilt>
        <TodayPickleCard cardData={TEST_DATA[currentPage - 1]} />
      </Tilt>
      <S.AttendanceButton
        onClick={handleAttendance}
        disabled={!isButtonActive(TEST_DATA[currentPage - 1].startHour, TEST_DATA[currentPage - 1].startMinute)}
      >
        <span>출석하기</span>
      </S.AttendanceButton>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 34.4rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  AttendanceButton: styled.button`
    width: 100%;
    background: #5dc26d;
    color: #fff;
    font-size: 1.4rem;
    padding: 1rem 0;
    border-radius: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:disabled {
      background: #d0d0d0;
      color: #8b8d94;
      cursor: auto;
    }
  `,
};
