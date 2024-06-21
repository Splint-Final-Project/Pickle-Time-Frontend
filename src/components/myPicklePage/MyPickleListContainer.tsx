import { useEffect, useState } from 'react';
import PickleStateFilterBar, { pickleState } from './PickleStateFilterBar';
import styled from '@emotion/styled';
import MyPickleCard, { PickleDataType } from './MyPickleCard';
import { useGetFinishPickles, useGetPendingPickles, useGetProceedingPickles } from '@/hooks/query/pickles';
import EmptyDataMessage from '../common/EmptyDataMessage';

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

  // server state
  const { data: pendingData } = useGetPendingPickles();
  const { data: proceedingData } = useGetProceedingPickles();
  const { data: finishData } = useGetFinishPickles();

  const pendingPickles = pendingData?.pendingPickles;
  const proceedingPickles = proceedingData?.proceedingPickles;
  const finishedPickles = finishData?.finishedPickles;

  console.log('pendingPickles', pendingPickles);
  console.log('proceedingPickles', proceedingPickles);
  console.log('finishPickles', finishedPickles);

  useEffect(() => {
    switch (currentState) {
      case 'pending':
        setPicklesList(pendingPickles);
        break;
      case 'progress':
        setPicklesList(proceedingPickles);
        break;
      case 'closed':
        setPicklesList(finishedPickles);
        break;

      default:
        setPicklesList(pendingPickles);
    }
  }, [currentState, pendingData]);

  return (
    <S.List>
      {picklesList.length
        ? picklesList?.map((item: any) => (
            <li key={item.id}>
              <MyPickleCard pickleData={item} />
            </li>
          ))
        : emptyPickleListDataRender(currentState)}
    </S.List>
  );
}

const emptyPickleListDataRender = (currentState: pickleState) => {
  switch (currentState) {
    case 'pending':
      return <EmptyDataMessage>신청 중인 피클이 없어요!</EmptyDataMessage>;
    case 'progress':
      return <EmptyDataMessage>진행 중인 피클이 없어요!</EmptyDataMessage>;
    case 'closed':
      return <EmptyDataMessage>종료된 피클이 없어요!</EmptyDataMessage>;
  }
};

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
