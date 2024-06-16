import { Link } from 'react-router-dom';
import SpecialPickleCardArrowIcon from '@/assets/icons/SpecialPickleCardArrowIcon';
import HeartButton from '@/components/common/button/HeartButton';
import BackImg from '@/assets/images/specialPickleCardBackImg.png';
import styled from '@emotion/styled';
import routes from '@/constants/routes';

const ONEDAY_MILLISECOND = 1000 * 60 * 60 * 24;

const calculateDday = (deadLine: string) => {
  const today = new Date().getTime();
  const deadLineMilliseconds = new Date(deadLine).getTime();
  return Math.floor((deadLineMilliseconds - today) / ONEDAY_MILLISECOND);
};

export default function PickleCardMockData() {
  return (
    <>
      {mockData.map(pickle => (
        <ul key={pickle.id}>
          <SpecialPickleCard pickleData={pickle} />
        </ul>
      ))}
    </>
  );
}

function SpecialPickleCard({ pickleData }: { pickleData: any }) {
  const Dday = calculateDday(pickleData.deadLine);

  const handleHeartClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <S.CardLayer to={`${routes.pickleList}/${pickleData.id}`}>
      <S.Wrap>
        <S.DeadlineBadge>D-{Dday}</S.DeadlineBadge>
        <HeartButton size={22} isActive={false} onClick={handleHeartClick} />
      </S.Wrap>
      <S.Title>{pickleData.title}</S.Title>
      <S.ResgisterStatus>
        {pickleData.capacity}명 중 <span>{pickleData.participantNumber}</span>명이 신청하는 중
      </S.ResgisterStatus>
      <S.Price>
        {pickleData.cost.toLocaleString()}
        <span>원</span>
      </S.Price>
      <S.Circle>
        <SpecialPickleCardArrowIcon />
      </S.Circle>
    </S.CardLayer>
  );
}

const S = {
  CardLayer: styled(Link)`
    display: block;
    margin: auto;
    width: 14.4rem;
    height: 16.5rem;
    border-radius: 0.4rem;
    background: #fff;
    padding: 1.2rem 1rem 1.5rem 1.5rem;
    color: #161616;
    position: relative;
    box-shadow: 0px 1px 2.8px 0px rgba(0, 0, 0, 0.25);
    transition: 0.5s;
    background-image: url(${BackImg});
  `,
  Wrap: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  DeadlineBadge: styled.span`
    display: inline-block;
    min-width: 2.8rem;
    height: 1.3rem;
    padding: 0 0.6rem;
    background: #dbd8d8;
    border-radius: 0.8rem;
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 1.3rem;
    margin-bottom: 1.6rem;
  `,
  Title: styled.h3`
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 120.983%;
    letter-spacing: -0.8px;
    margin-bottom: 1.2rem;
    min-height: 3.4rem;
  `,
  ResgisterStatus: styled.span`
    display: inline-block;
    width: 56%;
    color: rgba(111, 111, 111, 0.6);
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: -0.5px;
    line-height: normal;
    margin-bottom: 0.6rem;
    span {
      font-weight: bold;
    }
  `,
  Price: styled.em`
    font-size: 2rem;
    font-weight: 600;
    line-height: normal;
    display: flex;
    align-items: center;
    span {
      font-size: 1.2rem;
      font-weight: 500;
      color: #2c2c2c;
      margin-left: 0.2rem;
      transform: translateY(1.2px);
    }
  `,
  Circle: styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: #6fa978;
    position: absolute;
    bottom: 1.7rem;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const mockData = [
  {
    id: '1',
    title: '스터디 모임',
    capacity: 10,
    participantNumber: 5,
    cost: 10000,
    deadLine: '2024-07-01',
  },
  {
    id: '2',
    title: '운동 모임',
    capacity: 8,
    participantNumber: 3,
    cost: 5000,
    deadLine: '2024-07-05',
  },
  {
    id: '3',
    title: '책 읽기 모임',
    capacity: 12,
    participantNumber: 7,
    cost: 8000,
    deadLine: '2024-06-25',
  },
  {
    id: '4',
    title: '코딩 모임',
    capacity: 15,
    participantNumber: 10,
    cost: 15000,
    deadLine: '2024-06-30',
  },
  {
    id: '5',
    title: '요리 모임',
    capacity: 6,
    participantNumber: 4,
    cost: 20000,
    deadLine: '2024-07-02',
  },
  {
    id: '6',
    title: '등산 모임',
    capacity: 20,
    participantNumber: 15,
    cost: 5000,
    deadLine: '2024-07-10',
  },
  {
    id: '7',
    title: '영화 감상 모임',
    capacity: 10,
    participantNumber: 8,
    cost: 12000,
    deadLine: '2024-06-28',
  },
  {
    id: '8',
    title: '뮤지컬 관람 모임',
    capacity: 5,
    participantNumber: 5,
    cost: 30000,
    deadLine: '2024-07-04',
  },
  {
    id: '9',
    title: '사진 촬영 모임',
    capacity: 8,
    participantNumber: 6,
    cost: 8000,
    deadLine: '2024-07-08',
  },
  {
    id: '10',
    title: '볼링 모임',
    capacity: 12,
    participantNumber: 9,
    cost: 10000,
    deadLine: '2024-07-12',
  },
  // {
  //   id: '11',
  //   title: '축구 모임',
  //   capacity: 18,
  //   participantNumber: 14,
  //   cost: 15000,
  //   deadLine: '2024-07-15',
  // },
  // {
  //   id: '12',
  //   title: '음악 감상 모임',
  //   capacity: 9,
  //   participantNumber: 7,
  //   cost: 12000,
  //   deadLine: '2024-07-18',
  // },
  // {
  //   id: '13',
  //   title: '여행 모임',
  //   capacity: 16,
  //   participantNumber: 12,
  //   cost: 25000,
  //   deadLine: '2024-07-20',
  // },
  // {
  //   id: '14',
  //   title: '보드게임 모임',
  //   capacity: 8,
  //   participantNumber: 6,
  //   cost: 7000,
  //   deadLine: '2024-07-22',
  // },
  // {
  //   id: '15',
  //   title: '요가 모임',
  //   capacity: 12,
  //   participantNumber: 10,
  //   cost: 13000,
  //   deadLine: '2024-07-24',
  // },
  // {
  //   id: '16',
  //   title: '서핑 모임',
  //   capacity: 6,
  //   participantNumber: 4,
  //   cost: 30000,
  //   deadLine: '2024-07-26',
  // },
  // {
  //   id: '17',
  //   title: '캠핑 모임',
  //   capacity: 10,
  //   participantNumber: 8,
  //   cost: 20000,
  //   deadLine: '2024-07-28',
  // },
  // {
  //   id: '18',
  //   title: '클라이밍 모임',
  //   capacity: 8,
  //   participantNumber: 5,
  //   cost: 15000,
  //   deadLine: '2024-07-30',
  // },
  // {
  //   id: '19',
  //   title: '바둑 모임',
  //   capacity: 10,
  //   participantNumber: 7,
  //   cost: 5000,
  //   deadLine: '2024-08-01',
  // },
  // {
  //   id: '20',
  //   title: '마라톤 모임',
  //   capacity: 20,
  //   participantNumber: 15,
  //   cost: 25000,
  //   deadLine: '2024-08-03',
  // },
  // {
  //   id: '21',
  //   title: '사진 편집 모임',
  //   capacity: 12,
  //   participantNumber: 9,
  //   cost: 18000,
  //   deadLine: '2024-08-05',
  // },
  // {
  //   id: '22',
  //   title: '드로잉 모임',
  //   capacity: 10,
  //   participantNumber: 6,
  //   cost: 10000,
  //   deadLine: '2024-08-07',
  // },
  // {
  //   id: '23',
  //   title: '플라워 아트 모임',
  //   capacity: 8,
  //   participantNumber: 5,
  //   cost: 22000,
  //   deadLine: '2024-08-09',
  // },
  // {
  //   id: '24',
  //   title: '크로스핏 모임',
  //   capacity: 15,
  //   participantNumber: 10,
  //   cost: 30000,
  //   deadLine: '2024-08-11',
  // },
  // {
  //   id: '25',
  //   title: '런닝 모임',
  //   capacity: 10,
  //   participantNumber: 8,
  //   cost: 12000,
  //   deadLine: '2024-08-13',
  // },
  // {
  //   id: '26',
  //   title: '스쿠버다이빙 모임',
  //   capacity: 6,
  //   participantNumber: 5,
  //   cost: 35000,
  //   deadLine: '2024-08-15',
  // },
  // {
  //   id: '27',
  //   title: '명상 모임',
  //   capacity: 12,
  //   participantNumber: 9,
  //   cost: 8000,
  //   deadLine: '2024-08-17',
  // },
  // {
  //   id: '28',
  //   title: '카약 모임',
  //   capacity: 10,
  //   participantNumber: 7,
  //   cost: 28000,
  //   deadLine: '2024-08-19',
  // },
  // {
  //   id: '29',
  //   title: '피크닉 모임',
  //   capacity: 16,
  //   participantNumber: 12,
  //   cost: 15000,
  //   deadLine: '2024-08-21',
  // },
  // {
  //   id: '30',
  //   title: '마술 모임',
  //   capacity: 8,
  //   participantNumber: 6,
  //   cost: 18000,
  //   deadLine: '2024-08-23',
  // },
];
