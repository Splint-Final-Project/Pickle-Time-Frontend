import { KeyboardEventHandler, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Tag from '@/components/common/tag/Tag';
import openai from '@/apis/openai';

export default function GoalSelect({ hook }: { hook: any }) {
  const { title, goals, setGoals } = hook();
  const [aiGeneratedGoals, setAIGeneratedGoals] = useState<string[]>([]);

  async function generateGoals() {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful and creative writer that only speaks Korean.' },
        {
          role: 'user',
          content: `"${title}"라는 제목으로 스터디 모임을 만들고 싶은데, 수치로 확인할 수 있는 목표들을 세 가지 추천해 줘. 예컨데 토익 850점, 총 100km 러닝 등. 순서 구분 없이 comma로 구분해서 답변해 줘. 목표 하나당 15자를 넘어서는 안 돼.`,
        },
      ],
      model: 'gpt-4o',
    });
    setAIGeneratedGoals(completion.choices[0].message.content?.split(',') || []);
  }

  const handleKeyDown: KeyboardEventHandler = e => {
    const target = e.target as HTMLInputElement;

    if (target.value === '' && e.key === 'Backspace') {
      e.preventDefault();
      const updatedGoals = goals.slice(0, -1);
      setGoals(updatedGoals);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      if (aiGeneratedGoals) {
        target.value = aiGeneratedGoals[0];
        aiGeneratedGoals.shift();
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (target.value.trim() === '') {
        return;
      }

      if (goals.includes(target.value)) {
        return;
      }

      const newGoals = [...goals, target.value];
      setGoals(newGoals);
      target.value = '';

      return;
    }
  };

  const handleRemove = (removedName: string) => {
    const updatedGoals = goals.filter(goal => goal !== removedName);
    setGoals(updatedGoals);
  };

  useEffect(() => {
    generateGoals();
  }, []);

  return (
    <S.Container>
      <S.Text>
        피클의 목표를 설정해 주세요{' '}
        <span>{aiGeneratedGoals.length !== 0 ? 'Tab으로 자동완성, 입력 후 Enter' : '입력 후 Enter'}</span>
      </S.Text>
      <S.InputLabel>
        <S.InputWithType>
          <S.Input placeholder={aiGeneratedGoals.length !== 0 ? aiGeneratedGoals[0] : ''} onKeyDown={handleKeyDown} />
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

    gap: 2.3rem;
  `,

  Text: styled.span`
    color: #292929;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
    span {
      color: var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94));
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 0%; /* 0px */
      vertical-align: baseline;
    }
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
    font-weight: 500;
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
    padding: 2rem 0;
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
    font-size: 1.4rem;
    font-weight: 400;
    font-style: normal;
    line-height: normal;
  `,
};
