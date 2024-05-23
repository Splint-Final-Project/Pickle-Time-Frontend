import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import useButtonClick from '../hooks/zustand/test';
import useAuth from '../hooks/zustand/useAuth';

const Button = styled.button`
  color: hotpink;
`;

export default function Home() {
  const { count, inc } = useButtonClick();

  const { getUser, signOut } = useAuth();
  return (
    <div>
      <h1>React App</h1>
      <p>React app with TypeScript</p>
      <div>
        <Button onClick={inc}>Styled Button {count}</Button>
        <Link to="/chat-list">Chat List</Link>
      </div>
      <div>{getUser() ? <button onClick={signOut}>로그아웃</button> : <Link to="/sign-in">Sign In</Link>}</div>
    </div>
  );
}
