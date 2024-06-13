import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import styled from '@emotion/styled';

const formatCost = (cost: number) => {
  return cost.toLocaleString('en-US'); // 3자리마다 쉼표 추가
};

export default function CostSelect() {
  const { cost, setCost } = usePickleCreation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const newCost = parseFloat(value);
    setCost(newCost);
  };

  return (
    <S.Container>
      <S.Text>가격을 설정해 주세요</S.Text>
      <S.InputWrapper>
        <S.InputLabel>
          <S.Input
            placeholder="10,000"
            onChange={handleInputChange}
            value={isNaN(cost) || cost === 0 ? '' : formatCost(cost)}
          />
        </S.InputLabel>
        <S.CostText>원</S.CostText>
      </S.InputWrapper>
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

  InputWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  InputLabel: styled.label`
    width: 12rem;
  `,

  Input: styled.input`
    width: 12rem;
    border: none;
    border-bottom: 0.2rem solid #ddd;
    font-family: Pretendard;
    text-align: right;
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

  CostText: styled.span`
    color: #181f29;
    font-family: Pretendard;
    font-size: 2.4rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,
};
