import { css } from '@emotion/react';
import styled from '@emotion/styled';

const MY_PICKLES_STATE_LIST: {
  id: number;
  text: string;
  state: pickleState;
}[] = [
  {
    id: 1,
    text: '신청 중인 피클',
    state: 'pending',
  },
  {
    id: 2,
    text: '진행 중인 피클',
    state: 'progress',
  },
  {
    id: 3,
    text: '종료된 피클',
    state: 'closed',
  },
];

export type pickleState = 'pending' | 'progress' | 'closed';

interface PickleStateFilterBarProps {
  currentState: pickleState;
  setCurrentState: (arg0: any) => void;
}

export default function PickleStateFilterBar({ currentState, setCurrentState }: PickleStateFilterBarProps) {
  return (
    <S.Container>
      {MY_PICKLES_STATE_LIST.map(tab => (
        <S.FilterTab key={tab.id} $current={tab.state === currentState} onClick={() => setCurrentState(tab.state)}>
          <span>{tab.text}</span>
        </S.FilterTab>
      ))}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    font-size: 1.4rem;
    color: #8b8d94;
  `,
  FilterTab: styled.button<{ $current: boolean }>`
    padding: 0.8rem 1.5rem;
    background-color: #f1f1f1;
    border-radius: 1.8rem;
    color: #8b8d94;
    ${({ $current }) =>
      $current &&
      css`
        background: #181f29;
        color: #fff;
      `}
  `,
};
