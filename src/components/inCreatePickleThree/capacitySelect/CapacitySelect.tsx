import usePickleCreation from "@/hooks/zustand/usePickleCreation"
import styled from '@emotion/styled';

const MAX_CAPACITY = 6;

const limitMaxCapacity = (capacity: number) => {
  if (capacity > MAX_CAPACITY) {
    return MAX_CAPACITY;
  }

  return capacity;
}

export default function CapacitySelect() {
  const { capacity, setCapacity } = usePickleCreation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNewCapacity = e.target.value;
    const newCapacity = parseFloat(inputNewCapacity);
    setCapacity(limitMaxCapacity(newCapacity));
  };

  return (
    <S.Container>
      <S.Text>참여 인원을 설정해 주세요</S.Text>
      <S.InputWrapper>
        <S.InputLabel>
          <S.Input placeholder="00" onChange={handleInputChange} value={isNaN(capacity) || capacity === 0 ? '' : capacity}/>
        </S.InputLabel>
        <S.CapacityText>명</S.CapacityText>
      </S.InputWrapper>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 3rem 0;
    gap: 5rem;
  `,
  
  Text: styled.span`
    color: #292929;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,

  InputWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 3.5rem;
  `,

  InputLabel: styled.label`
    width: 5rem;
  `,
   
  Input: styled.input`
    width: 5rem;
    border: none;
    border-bottom: 0.2rem solid #ddd;
    font-family: Pretendard;
    text-align: right;
    font-size: 2.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
    outline: none;

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
  `
};
