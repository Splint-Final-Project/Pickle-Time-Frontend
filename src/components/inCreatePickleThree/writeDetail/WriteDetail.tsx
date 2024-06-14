import openai from '@/apis/openai';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

export default function WriteDetail() {
  const { title, explanation, setExplanation } = usePickleCreation();
  const [placeholder, setPlaceholder] = useState(
    '지향하는 분위기, 주의사항 등 자유롭게 피클을 소개하는 내용을 입력해 주세요.',
  );
  const [isAIready, setIsAIready] = useState(false);

  async function generateExplanation() {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful and creative writer that only speaks Korean.' },
        {
          role: 'user',
          content: `"${title}"라는 제목으로 스터디 모임을 만들고 싶은데, 재미있고 창의적인 소개글을 써 줘. 지향하는 분위기와 주의사항 등을 포함해야 해. 공백포함 200자를 넘어선 안 돼. 마크다운 문법은 사용하지 말아 줘`,
        },
      ],
      model: 'gpt-4o',
    });

    return completion?.choices[0]?.message?.content;
  }

  async function handleAIGeneratePlaceholder() {
    let result = await generateExplanation();
    if (result) {
      setPlaceholder(result);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newExplanation = e.target.value;
    setExplanation(newExplanation);
  };

  useEffect(() => {
    handleAIGeneratePlaceholder();
  }, []);

  return (
    <S.Container>
      <S.Text>
        피클을 소개하는 글을 작성해 주세요 <span>tab 키를 눌러 자동완성</span>
      </S.Text>
      <S.InputLabel>
        <S.Input
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={e => {
            if (e.key === 'Tab') {
              e.preventDefault();
              setExplanation(placeholder);
            }
          }}
          value={explanation}
        />
      </S.InputLabel>
      <S.SubText>({explanation.length}/200)</S.SubText>
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
    /* height: 20rem; */
  `,

  Input: styled.textarea`
    width: 100%;
    padding-bottom: 20rem;
    border: none;
    border-bottom: 0.2rem solid #ddd;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-weight: 600;
    resize: none;
    font-style: normal;
    line-height: 120%;
    ::placeholder {
      color: #8b8d94;
    }

    &:focus {
      outline: none;
      border-bottom-color: #333; // Focus 시 밑줄 색상 변경
    }
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
    text-align: right;
  `,
};
