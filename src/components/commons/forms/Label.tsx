interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

//TODO : 스타일 컴포넌트로 만들기
export default function Label({ children, htmlFor }: LabelProps) {
  return <label htmlFor={htmlFor}>{children}</label>;
}
