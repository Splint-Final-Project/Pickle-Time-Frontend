import styled from '@emotion/styled';

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
