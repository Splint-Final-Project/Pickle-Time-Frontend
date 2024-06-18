import { useState } from 'react';
import PickleStateFilterBar, { pickleState } from './PickleStateFilterBar';
import styled from '@emotion/styled';
import MyPickleCard from './MyPickleCard';

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

function MyPickleList({ currentState }: MyPickleListProps) {
  return (
    <S.List>
      <li>
        <MyPickleCard categoryType="취미" state={currentState} />
      </li>
      <li>
        <MyPickleCard categoryType="스터디" state={currentState} />
      </li>
      <li>
        <MyPickleCard categoryType="운동" state={currentState} />
      </li>
      <li>
        <MyPickleCard categoryType="스터디" state={currentState} />
      </li>
      <li>
        <MyPickleCard categoryType="운동" state={currentState} />
      </li>
      <li>
        <MyPickleCard categoryType="취미" state={currentState} />
      </li>
      <li>
        <MyPickleCard categoryType="취미" state={currentState} />
      </li>
      <li>
        <MyPickleCard categoryType="스터디" state={currentState} />
      </li>
      <li>
        <MyPickleCard categoryType="취미" state={currentState} />
      </li>
      <li>
        <MyPickleCard categoryType="스터디" state={currentState} />
      </li>
      <li>
        <MyPickleCard categoryType="운동" state={currentState} />
      </li>
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
