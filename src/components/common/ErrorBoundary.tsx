import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback: React.ElementType;
}

interface State {
  hasError: boolean;
  info: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, info: null };
  }
  //렌더 단계에서 호출된다.
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, info: error };
  }

  // 커밋 단계에서 호출되어 실행된다.
  //error : 에러에 대한 정보,
  //info : 어떤 컴포넌트가 오류를 발생했는지에 대한 내용을 포함한 componentStack키를 갖고 있는객체

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    const { hasError, info } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <this.props.fallback error={info} />;
    }
    return children;
  }
}

export default ErrorBoundary;
