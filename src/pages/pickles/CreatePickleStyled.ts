import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
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
  margin: 0 35px;
  height: 42px;
  border-radius: 4px;
  background: var(--Main-Color, #5dc26d);
  color: white;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const LabelText = styled.label`
  color: #292929;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 5px;
`;

export const InputConstraint = styled.div`
  color: var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94));
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  margin-top: 8px;
`;

export const InputField = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #d0d0d0;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:focus {
    border-bottom-color: #045905;
  }
  ::placeholder {
    color: var(--Input-Text, #bababa);
  }
`;

export const SearchButton = styled.img`
  position: absolute;
  right: 50px;
  top: 68px;
  cursor: pointer;
`;

export const JusoOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  padding: 10px;
  border: 1px solid #f1f1f1;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: black;
  span {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: gray;
  }
`;
