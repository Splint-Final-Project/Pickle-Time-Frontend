import usePickleCreation from "@/hooks/zustand/usePickleCreation"
import styled from '@emotion/styled';

export default function GoalSelect() {
  const { explanation, setExplanation } = usePickleCreation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newExplanation = e.target.value;
    setExplanation(newExplanation);
  };

  return (
    <S.Container>
      <S.Text>피클의 목표를 설정해 주세요</S.Text>
        <S.InputLabel>
          <S.InputWithType>
            <S.Input placeholder="토익 850점!, 총 100km 러닝하기 등" onChange={handleInputChange} value={explanation}/>
            <S.SubText>최대 5개까지 입력 가능하며 각 15자 이내로 작성해 주세요</S.SubText>
          </S.InputWithType>
        </S.InputLabel>
    </S.Container>
  )
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
    /* height: 20rem; */
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

  CapacityText: styled.span`
    color: #181F29;
    font-family: Pretendard;
    font-size: 2.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,

  SubText: styled.span`
    color: #8B8D94;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `
};
