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
  VerifyButton,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-height: 100%;
  padding: 14rem 3.2rem 8rem;
`;

const Title = styled.h1`
  margin-bottom: 5.6rem;
  ${({ theme }) => theme.typography.header};
`;

const SubTitle = styled.h4`
  margin-bottom: 0.9rem;
  color: ${({ theme }) => theme.color.sub};
  ${({ theme }) => theme.typography.subTitle3};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4.2rem;
  width: 100%;
`;

const FormField = styled.fieldset`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const InputContainer = styled.div<{
  $isError: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;

  width: 100%;
  height: 6rem;
  padding: 1.1rem 1.4rem 0.8rem;
  border: ${props => (props.$isError ? '1px solid #D54040;' : '1px solid #f5f9f8;')};
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.color.inputBox};

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
  color: ${({ theme }) => theme.color.sub};
  ${({ theme }) => theme.typography.body2};
`;

const InputField = styled.input`
  width: 100%;
  height: 2.5rem;
  border: none;
  border-radius: 0.4rem;
  background: none;
  outline: none;
  ${({ theme }) => theme.typography.body3};

  ::placeholder {
    color: ${({ theme }) => theme.color.inputText};
  }
`;

const VerifyButton = styled.button`
  position: absolute;
  right: 15px;
  bottom: 7px;
  width: 49px;
  height: 25px;
  /* background-color: lightgray; */
  border: none;
  border-radius: 4px;
`;

const InputButton = styled.img`
  position: absolute;
  right: 1.5rem;
  bottom: 1.3rem;
  width: 1.4rem;
  height: 1.4rem;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  position: absolute;
  bottom: -25px;
  color: ${({ theme }) => theme.color.error};
  ${({ theme }) => theme.typography.body2};
  line-height: normal;
`;

const Label = styled.label`
  margin-bottom: 1.5rem;
  ${({ theme }) => theme.typography.subTitle2};

  span {
    color: ${({ theme }) => theme.color.primary};
    ${({ theme }) => theme.typography.body2};
    line-height: normal;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  width: 2.6rem;
  height: 1.8rem;
  border: none;
  color: #0ac50a;
  ${({ theme }) => theme.typography.subTitle2};

  &:disabled {
    color: #8e8e8e;
  }
`;

export const AreaSelector = styled.div`
  width: 100%;
  height: 26.8rem;
  display: flex;
  border-top: 1.2px solid #888d88;
  border-bottom: 1.2px solid #888d88;
`;

export const SiSelector = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  overflow-y: auto;
  border-right: ${({ theme }) => theme.border};
`;

export const SiElement = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 100%;
  height: 4.6rem;
  background-color: #f5f9f8;
  border: ${props => (props.$selected ? '1px solid #5DC26D' : '1px solid #F5F9F8')};

  ${({ theme }) => theme.typography.body1};
  text-align: center;
  font-weight: ${props => (props.$selected ? '600' : '500')};
  color: ${props => (props.$selected ? '#5DC26D' : '#888D88')};
  cursor: pointer;
`;

export const GuSelector = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  overflow-y: auto;
  border-right: ${({ theme }) => theme.border};
`;

export const GuElement = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 100%;
  height: 4.6rem;
  font-size: 14px;
  border-bottom: 0.7px solid #d0d0d0;
  text-align: center;
  color: ${props => (props.$selected ? '#5DC26D' : '#888D88')};
  ${({ theme }) => theme.typography.body3};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

export const SelectedGus = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem 0.8rem;
  width: 100%;
  margin-top: 2.4rem;
`;

export const SelectedGu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 0.8rem;

  min-width: 9.1rem;
  height: 3rem;
  padding: 0.8rem;
  border-radius: 0.4rem;
  border: 1px solid #5dc26d;
  color: ${({ theme }) => theme.color.primary};
  ${({ theme }) => theme.typography.body2};
  line-height: normal;

  img {
    cursor: pointer;
  }
`;

const FinishButton = styled.button`
  width: 100%;
  height: 4.2rem;
  border: none;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  ${({ theme }) => theme.typography.body1};

  &:disabled {
    background-color: #9d9d9d;
  }
`;
