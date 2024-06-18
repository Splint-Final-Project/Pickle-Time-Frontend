import { useEffect, useState } from 'react';
import PickleStateFilterBar, { pickleState } from './PickleStateFilterBar';
import styled from '@emotion/styled';
import MyPickleCard, { PickleDataType } from './MyPickleCard';
import { useQueryClient } from '@tanstack/react-query';

//TODO : api 연결 해서 보여주기
export default function MyPickleListContainer() {
  const [currentState, setCurrentState] = useState<pickleState>('pending');
  return (
    <S.Container>
      <PickleStateFilterBar currentState={currentState} setCurrentState={setCurrentState} />
      <MyPickleList currentState={currentState} />
    </S.Container>
  );
}

interface MyPickleListProps {
  currentState: pickleState;
}

const TEST_DATA: PickleDataType[] = [
  {
    title: '독서 모임',
    duration: '07.11 ~ 08.01',
    address: '서울 스타벅스',
    categoryType: '스터디',
    state: 'pending',
    id: 'as1d5sad2as35sd4',
  },
  {
    title: '요가 클래스',
    duration: '06.15 ~ 07.15',
    address: '서울 요가 스튜디오',
    categoryType: '운동',
    state: 'progress',
    id: 'bs2f6sbf3bf46bf5',
  },
  {
    title: '사진 동호회',
    duration: '07.20 ~ 08.20',
    address: '서울 한강공원',
    categoryType: '취미',
    state: 'pending',
    id: 'cs3g7scg4cg57cg6',
  },
  {
    title: '프로그래밍 스터디',
    duration: '08.01 ~ 09.01',
    address: '서울 코딩 스쿨',
    categoryType: '스터디',
    state: 'progress',
    id: 'ds4h8sdh5dh68dh7',
  },
  {
    title: '클라이밍 모임',
    duration: '05.01 ~ 06.01',
    address: '서울 클라이밍 센터',
    categoryType: '운동',
    state: 'closed',
    id: 'es5i9sei6ei79ei8',
  },
  {
    title: '수채화 클래스',
    duration: '06.10 ~ 07.10',
    address: '서울 미술 학원',
    categoryType: '취미',
    state: 'progress',
    id: 'fs6j0sfj7fj80fj9',
  },
  {
    title: '영어 회화 스터디',
    duration: '07.01 ~ 07.31',
    address: '서울 영어 카페',
    categoryType: '스터디',
    state: 'pending',
    id: 'gs7k1sgk8gk91gk0',
  },
  {
    title: '마라톤 준비 모임',
    duration: '08.05 ~ 09.05',
    address: '서울 올림픽 공원',
    categoryType: '운동',
    state: 'progress',
    id: 'hs8l2shl9hl02hl1',
  },
  {
    title: '사진 촬영 동호회',
    duration: '06.01 ~ 07.01',
    address: '서울 남산',
    categoryType: '취미',
    state: 'closed',
    id: 'is9m3sim0im13im2',
  },
  {
    title: '한국사 스터디',
    duration: '07.15 ~ 08.15',
    address: '서울 역사 박물관',
    categoryType: '스터디',
    state: 'progress',
    id: 'js0n4sjn1jn24jn3',
  },
  {
    title: '헬스 트레이닝',
    duration: '05.20 ~ 06.20',
    address: '서울 헬스장',
    categoryType: '운동',
    state: 'closed',
    id: 'ks1o5sko2ko35ko4',
  },
  {
    title: '비누 만들기 클래스',
    duration: '07.01 ~ 08.01',
    address: '서울 공방',
    categoryType: '취미',
    state: 'pending',
    id: 'ls2p6slp3lp46lp5',
  },
  {
    title: '데이터 분석 스터디',
    duration: '06.01 ~ 07.01',
    address: '서울 데이터 센터',
    categoryType: '스터디',
    state: 'closed',
    id: 'ms3q7smq4mq57mq6',
  },
];
function MyPickleList({ currentState }: MyPickleListProps) {
  // const [picklesList, setPicklesList] = useState<any>([]);
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   switch (currentState) {
  //     case 'progress':
  //       const data = queryClient.getQueryData(['pickles', 'proceeding']);
  //       setPicklesList(data);
  //       break;
  //   }

  // }, [currentState, picklesList]);
  const FilterData = TEST_DATA.filter(item => item.state === currentState);
  return (
    <S.List>
      {FilterData.map(item => (
        <li key={item.id}>
          <MyPickleCard pickleData={item} />
        </li>
      ))}
    </S.List>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  List: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
};
