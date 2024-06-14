import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import styled from '@emotion/styled';

export default function WriteDetail() {
  const { explanation, setExplanation } = usePickleCreation();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newExplanation = e.target.value;
    setExplanation(newExplanation);
  };

  return (
    <S.Container>
      <S.Text>피클을 소개하는 글을 작성해 주세요</S.Text>
      <S.InputLabel>
        <S.Input
          placeholder="지향하는 분위기, 주의사항 등 자유롭게 피클을 소개하는 내용을 입력해 주세요."
          onChange={handleInputChange}
          value={explanation}
        />
      </S.InputLabel>
      <S.SubText>200자 이내로 입력해 주세요</S.SubText>
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
  `,
};
