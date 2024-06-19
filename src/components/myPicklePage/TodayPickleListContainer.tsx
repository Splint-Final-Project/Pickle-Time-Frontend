import styled from '@emotion/styled';
import PagenationBar from './PagenationBar';
import TodayPickleCard from './TodayPickleCard';
import Tilt from 'react-parallax-tilt';
import { useGetFinishPickles, useGetProceedingPickles } from '@/hooks/query/pickles';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import isButtonActive from '@/utils/isButtonActive';
import betweenLength from '@/utils/betweenLength';

const TEST_DATA = [
  {
    title: '러닝 달려 달려!',
    finishDate: '~ 09.12',
    time: '09 : 00am ~ 11 : 00am',
    startTime: '01 : 30am',
    address: '서울 한강',
    detailAddress: '러닝 파크',
    isNearby: true,
    startHour: 1,
    startMinute: 30,
  },
  {
    title: '요가 클래스',
    finishDate: '~ 09.14',
    time: '06 : 30am ~ 07 : 30am',
    startTime: '01 : 50am',
    address: '서울 강남',
    detailAddress: '요가 스튜디오',
    isNearby: false,
    startHour: 1,
    startMinute: 50,
  },
  {
    title: '헬스 트레이닝',
    finishDate: '~ 09.15',
    time: '07 : 00pm ~ 08 : 30pm',
    startTime: '01 : 55am',
    address: '서울 신촌',
    detailAddress: '헬스 클럽',
    isNearby: true,
    startHour: 1,
    startMinute: 55,
  },
  {
    title: '사이클링 투어',
    finishDate: '~ 09.20',
    time: '05 : 00am ~ 07 : 00am',
    startTime: '01 : 08am',
    address: '서울 남산',
    detailAddress: '사이클링 코스',
    isNearby: false,
    startHour: 1,
    startMinute: 8,
  },
  {
    title: '수영 강습',
    finishDate: '~ 09.18',
    time: '08 : 00am ~ 09 : 00am',
    startTime: '01 : 09am',
    address: '서울 강동',
    detailAddress: '수영장',
    isNearby: true,
    startHour: 1,
    startMinute: 9,
  },
  {
    title: '등산 모임',
    finishDate: '~ 09.25',
    time: '06 : 00am ~ 10 : 00am',
    startTime: '02 : 00am',
    address: '서울 북한산',
    detailAddress: '등산로 입구',
    isNearby: true,
    startHour: 2,
    startMinute: 0,
  },
  {
    title: '크로스핏 챌린지',
    finishDate: '~ 09.22',
    time: '07 : 00pm ~ 09 : 00pm',
    startTime: '02 : 05pm',
    address: '서울 홍대',
    detailAddress: '크로스핏 센터',
    isNearby: false,
    startHour: 2,
    startMinute: 5,
  },
  {
    title: '필라테스 클래스',
    finishDate: '~ 09.19',
    time: '10 : 00am ~ 11 : 00am',
    startTime: '01 : 53am',
    address: '서울 서초',
    detailAddress: '필라테스 스튜디오',
    isNearby: true,
    startHour: 1,
    startMinute: 53,
  },
  {
    title: '탁구 대회',
    finishDate: '~ 09.28',
    time: '02 : 00pm ~ 04 : 00pm',
    startTime: '02 : 30am',
    address: '서울 종로',
    detailAddress: '체육관',
    isNearby: false,
    startHour: 2,
    startMinute: 30,
  },
  {
    title: '조깅 모임',
    finishDate: '~ 09.30',
    time: '07 : 00am ~ 08 : 00am',
    startTime: '01 : 55am',
    address: '서울 성수',
    detailAddress: '조깅 트랙',
    isNearby: true,
    startHour: 1,
    startMinute: 55,
  },
  {
    title: '복싱 클래스',
    finishDate: '~ 10.02',
    time: '06 : 00pm ~ 07 : 30pm',
    startTime: '01 : 55pm',
    address: '서울 영등포',
    detailAddress: '복싱 체육관',
    isNearby: false,
    startHour: 1,
    startMinute: 55,
  },
  {
    title: '댄스 클래스',
    finishDate: '~ 10.05',
    time: '05 : 00pm ~ 06 : 30pm',
    startTime: '01 : 55am',
    address: '서울 마포',
    detailAddress: '댄스 스튜디오',
    isNearby: true,
    startHour: 1,
    startMinute: 55,
  },
  {
    title: '테니스 레슨',
    finishDate: '~ 10.08',
    time: '08 : 00am ~ 09 : 30am',
    startTime: '01 : 59am',
    address: '서울 송파',
    detailAddress: '테니스 코트',
    isNearby: false,
    startHour: 1,
    startMinute: 59,
  },
];
export default function TodayPickleListContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [length, setLength] = useState(0);

  const currentPage = Number(searchParams.get('page')) || 1;
  const queryClient = useQueryClient();

  const pickleData: any = queryClient.getQueryData(['pickles', 'proceeding']);
  const todayPickles = pickleData?.todayPickles;

  const handleAttendance = () => {
    // alert(`${location?.longitude} ,${location?.latitude}`);
    //TODO : 출석을 누르면 경도 위도를 POST로 보내어 출석을 한다.
  };
  useEffect(() => {
    const length = async () => {
      const result = await betweenLength({ latitude: 37.5547, longitude: 126.9706 });
      console.log(result);
      setLength(result);
    };
    length();
  }, []);
  console.log(length);
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

//버튼 disabled 판단 함수

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
