import styled from '@emotion/styled';

export const Container = styled.div`
  width: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h1`
  color: #292929;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 64px 0;
`;

export const Subtitle = styled.h4`
  color: #989898;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const FieldSet = styled.fieldset`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const Label = styled.label`
  color: #2c2c2c;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Input = styled.input<{ $error: boolean }>`
  width: 100%;
  height: 44px;
  padding: 13px;
  color: #bababa;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 4px;
  background-color: #f4f7f4;
  border: none;
  ${props => (props.$error ? 'border: 1px solid red;' : '')};
  &:focus {
    border: 1px solid green;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  outline: none;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const EmailActionRedirectors = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  gap: 27px;
  margin-top: 30px;
  a {
    color: #777;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const EmailSignupRedirectorLink = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin: 33px 0 118px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  span {
    color: #777;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  a {
    color: #0ac50a;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    &hover {
      color: green;
    }
  }
`;

export const Or = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 11px;
  span {
    color: #777;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const SocialCircles = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

export const SocialCircle = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #ababab;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin: 100px 0;
`;

export const SocialStartButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
