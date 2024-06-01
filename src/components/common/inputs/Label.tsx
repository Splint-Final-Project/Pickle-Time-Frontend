import styled from '@emotion/styled';

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

//TODO : 스타일 컴포넌트로 만들기
export default function Label({ children, htmlFor }: LabelProps) {
  return <Styled.Label htmlFor={htmlFor}>{children}</Styled.Label>;
}
//TODO : 스타일링 추가 및 변경
const Styled = {
  Label: styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 12px;
  `,
};
