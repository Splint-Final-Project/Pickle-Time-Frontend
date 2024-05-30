interface ErrorMessageProps {
  children: React.ReactNode;
}
//TODO : 스타일 컴포넌트로 만들기

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <p>{children}</p>;
}
