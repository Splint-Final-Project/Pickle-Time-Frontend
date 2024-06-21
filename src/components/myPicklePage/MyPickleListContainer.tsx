import { useEffect, useState } from 'react';
import PickleStateFilterBar, { pickleState } from './PickleStateFilterBar';
import styled from '@emotion/styled';
import MyPickleCard, { PickleDataType } from './MyPickleCard';
import { useGetFinishPickles, useGetPendingPickles, useGetProceedingPickles } from '@/hooks/query/pickles';
import EmptyDataMessage from '../common/EmptyDataMessage';
import { useSearchParams } from 'react-router-dom';

export default function MyPickleListContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  function setCurrentState(state: pickleState) {
    searchParams.set('state', state);
    setSearchParams(searchParams, { replace: true });
  }
  useEffect(() => {
    if (searchParams.get('state') === null) setCurrentState('progress');
  }, []);
  return (
    <S.Container>
      <PickleStateFilterBar
        currentState={(searchParams.get('state') || 'pending') as 'pending' | 'progress' | 'closed'}
        setCurrentState={(state: pickleState) => setCurrentState(state)}
      />
      <MyPickleList currentState={(searchParams.get('state') || 'pending') as 'pending' | 'progress' | 'closed'} />
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
  }, [currentState, pendingData, proceedingData, finishData]);

  return (
    <S.List>
      {picklesList.length ? (
        picklesList?.map((item: any) => (
          <li key={item.id}>
            <MyPickleCard pickleData={item} />
          </li>
        ))
      ) : (
        <S.Wrapper>{emptyPickleListDataRender(currentState)}</S.Wrapper>
      )}
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
  Wrapper: styled.div`
    width: 100%;
    min-height: 25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
