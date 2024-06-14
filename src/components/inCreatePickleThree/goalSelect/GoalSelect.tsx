import { KeyboardEventHandler } from 'react';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import styled from '@emotion/styled';
import Tag from '@/components/common/tag/Tag';

const PLACEHOLDER = {
  first: '토익 850점!, 총 100km 러닝하기 등 (입력 후 Enter)',
  others: '입력 후 Enter',
};

export default function GoalSelect() {
  const { goals, setAddGoals, setRemoveGoals } = usePickleCreation();
  let prevTargetValue: string;

  const handleKeyDown: KeyboardEventHandler = e => {
    e.preventDefault();

    if (prevTargetValue === '' && e.key === 'Backspace') {
      const updatedGoals = goals.slice(0, -1);
      setRemoveGoals(updatedGoals);
      return;
    }

    const target = e.target as HTMLInputElement;
    prevTargetValue = target.value;
    if (e.key !== 'Enter' && e.key !== 'Backspace') return;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (target.value.trim() === '') {
        return;
      }

      if (goals.includes(target.value)) {
        return;
      }

      const addGoal = target.value;
      setAddGoals(addGoal);
      target.value = '';

      return;
    }
  };

  const handleRemove = (removedName: string) => {
    const updatedGoals = goals.filter(goal => goal !== removedName);
    setRemoveGoals(updatedGoals);
  };

  return (
    <S.Container>
      <S.Text>피클의 목표를 설정해 주세요</S.Text>
      <S.InputLabel>
        <S.InputWithType>
          <S.Input placeholder="토익 850점!, 총 100km 러닝하기 등 (입력 후 Enter)" onKeyUp={handleKeyDown} />
          <S.SubText>15자 이내로 최대 5개까지 입력 가능합니다.</S.SubText>
        </S.InputWithType>
        <S.GoalContainer>
          {goals?.map(goal => (
            <Tag key={goal} handleRemove={() => handleRemove(goal)} hasHandler={true}>
              {goal}
            </Tag>
          ))}
        </S.GoalContainer>
      </S.InputLabel>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 3rem 0;
    gap: 2.3rem;
  `,

  Text: styled.span`
    color: #292929;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,

  InputLabel: styled.label`
    width: 100%;
    height: 20rem;
  `,
  InputWithType: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  Input: styled.input`
    padding-bottom: 1rem;
    width: 100%;
    line-height: 20rem;
    border: none;
    border-bottom: 0.2rem solid #ddd;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-weight: 600;
    resize: none;
    font-style: normal;
    line-height: normal;

    &:focus {
      border-bottom-color: #333; // Focus 시 밑줄 색상 변경
    }
  `,

  GoalContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem; /* 아이템 간의 간격 설정 */
    padding: 2rem;
  `,

  CapacityText: styled.span`
    color: #181f29;
    font-family: Pretendard;
    font-size: 2.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,

  SubText: styled.span`
    color: #8b8d94;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,
};
