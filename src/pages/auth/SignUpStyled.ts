import styled from '@emotion/styled';

export {
  Container,
  Title,
  SubTitle,
  Form,
  FormField,
  InputContainer,
  InputLabel,
  InputField,
  InputButton,
  ErrorMessage,
  Label,
  SubmitButton,
  FinishButton,
};

const Container = styled.div`
  width: 310px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  color: var(--Basic, #181f29);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 56px;
`;

const SubTitle = styled.h4`
  color: var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94));
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 9px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 42px;
`;

const FormField = styled.fieldset`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div<{
  $isError: boolean;
}>`
  position: relative;
  padding: 11px 14px 8px;
  width: 100%;
  height: 60px;
  display: flex;
  gap: 2px;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f5f9f8;
  border-radius: 4px;
  border: ${props => (props.$isError ? '1px solid #D54040;' : '1px solid #f5f9f8;')};
  &:focus-within {
    border: 1px solid #888d88;
  }
`;

const InputLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94));
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const InputField = styled.input`
  background: none;
  border: none;
  width: 100%;
  height: 25px;
  border-radius: 4px;
  outline: none;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  ::placeholder {
    color: #bababa;
  }
`;

const InputButton = styled.img`
  position: absolute;
  right: 15px;
  bottom: 13px;
  width: 14px;
  height: 14px;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  /* position: absolute; */
  margin-top: 9px;
  color: #d54040;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Label = styled.label`
  color: var(--Basic, #181f29);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  width: 26px;
  height: 18px;
  color: #0ac50a;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  &:disabled {
    color: #8e8e8e;
  }
`;

const FinishButton = styled.button`
  width: 100%;
  height: 42px;
  border: none;
  border-radius: 4px;
  background-color: #5dc26d;
  color: #ffffff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:disabled {
    background-color: #9d9d9d;
  }
`;
