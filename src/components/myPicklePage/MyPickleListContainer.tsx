import { useEffect, useState } from 'react';
import PickleStateFilterBar, { pickleState } from './PickleStateFilterBar';
import styled from '@emotion/styled';
import MyPickleCard, { PickleDataType } from './MyPickleCard';
import { useGetFinishPickles, useGetPendingPickles, useGetProceedingPickles } from '@/hooks/query/pickles';

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
  const [picklesList, setPicklesList] = useState<any>([]);

  const { data: pendingData } = useGetPendingPickles();
  const pendingPickles = pendingData?.pendingPickles;
  const { data: proceedingData } = useGetProceedingPickles();
  const proceedingPickles = proceedingData?.proceedingPickles;
  const { data: finishData } = useGetFinishPickles();
  const finishedPickles = finishData?.finishedPickles;
  console.log('pendingPickles', pendingPickles);
  console.log('proceedingPickles', proceedingPickles);
  console.log('finishPickles', finishedPickles);

  useEffect(() => {
    switch (currentState) {
      case 'pending':
        setPicklesList(pendingData);
        break;
      case 'progress':
        setPicklesList(proceedingPickles);
        break;
      case 'closed':
        setPicklesList(finishedPickles);
        break;
    }
  }, [currentState]);

  return (
    <S.List>
      {picklesList.map((item: any) => (
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
