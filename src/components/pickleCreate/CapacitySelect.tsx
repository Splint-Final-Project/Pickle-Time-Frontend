import styled from '@emotion/styled';

const MAX_CAPACITY = 6;

const limitMaxCapacity = (capacity: number) => {
  if (capacity > MAX_CAPACITY) {
    return MAX_CAPACITY;
  }

  return capacity;
};

export default function CapacitySelect({ hook }: { hook: any }) {
  const { capacity, setCapacity } = hook();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNewCapacity = e.target.value;
    const newCapacity = parseFloat(inputNewCapacity);
    setCapacity(limitMaxCapacity(newCapacity));
  };

  return (
    <S.Container>
      <S.Text>
        참여 인원을 설정해 주세요 <span>(2~6명)</span>
      </S.Text>
      <S.InputWrapper>
        <S.InputLabel>
          <S.Input
            placeholder="00"
            onChange={handleInputChange}
            value={isNaN(capacity) || capacity === 0 ? '' : capacity}
          />
        </S.InputLabel>
        <S.CapacityText>명</S.CapacityText>
      </S.InputWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    /*  */
    gap: 5rem;
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
    text-align: center;
    font-size: 2.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
    outline: none;
    ::placeholder {
      color: #bababa;
    }

    &:focus {
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
};
