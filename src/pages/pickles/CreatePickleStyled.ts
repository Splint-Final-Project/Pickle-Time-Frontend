import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  min-height: 100dvh;
  background-color: #f6f6f6;
`;

export const TitleContainer = styled.h1`
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  width: 100%;
  padding: 6rem 3.5rem 0;
  margin-bottom: -1.6rem;
  background-color: white;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 2.2rem;
  ${({ theme }) => theme.typography.header};

  img {
    height: 1.6rem;
    cursor: pointer;
  }
`;

export const StepIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  background-color: white;
`;

export const StepIndicator = styled.div<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  ${({ theme }) => theme.typography.body2};
  ${({ $selected }) =>
    $selected ? 'background-color: #181F29; color: white;' : 'background-color: #F1F1F1; color: #8B8D94;'}
`;

export const InputComponent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3.2rem 3.5rem;
  background-color: white;
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  height: 4.2rem;
  margin: 1rem 3.5rem 10rem;
  border-radius: 0.4rem;
  background-color: #5dc26d;
  color: ${({ theme }) => theme.color.white};
  ${({ theme }) => theme.typography.body1};
  transition: background-color 0.3s;

  &:hover {
    background-color: '#4aa657';
  }

  &:disabled {
    background-color: #d0d0d0;
    cursor: not-allowed;
  }
`;
