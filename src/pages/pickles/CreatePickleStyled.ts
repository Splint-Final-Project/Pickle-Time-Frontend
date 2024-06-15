import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f6f6f6;
`;

export const TitleContainer = styled.h1`
  width: 100%;
  padding: 60px 35px 0;
  display: flex;
  flex-direction: column;
  gap: 45px;
  background-color: white;

  margin-bottom: -16px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  color: var(--Basic, #181f29);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  img {
    height: 16px;
    cursor: pointer;
  }
`;

export const StepIndicatorContainer = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const StepIndicator = styled.div<{ $selected: boolean }>`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
  ${({ $selected }) =>
    $selected ? 'background-color: #181F29; color: white;' : 'background-color: #F1F1F1; color: #8B8D94;'}
`;

export const InputComponent = styled.div`
  position: relative;
  width: 100%;
  padding: 32px 35px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const SubmitButton = styled.button`
  margin: 1rem 3.5rem 0;
  height: 42px;
  border-radius: 4px;
  background-color: #5dc26d;
  color: white;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  transition: background-color 0.3s;

  &:hover {
    background-color: '#4aa657';
  }
  &:disabled {
    background-color: #d0d0d0;
    cursor: not-allowed;
  }
`;
