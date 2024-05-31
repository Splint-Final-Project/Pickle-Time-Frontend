import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/zustand/useAuth';
import KaKaoMap from '@/components/map/KaKaoMap';
import routes from '@/constants/routes';

const Button = styled.button`
  color: hotpink;
`;

export default function Home() {
  // 전역 상태
  const { getUser, signOut } = useAuth();
  const user = getUser();

  return (
    <div>
      <h1>피클타임 홈 페이지</h1>
      <div>
        {user ? (
          <>
            안녕하세요 {user.email}님 <button onClick={signOut}>로그아웃</button>
          </>
        ) : (
          <Link to={routes.signIn}>Sign In</Link>
        )}
      </div>
      <br />
      <br />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={routes.chatList}>Chat List</Link>

        <Link to={routes.pickle}>테스트 피클 보기+결제하기</Link>
      </div>
      <br />
      <br />
      <br />
      <KaKaoMap />
    </div>
  );
}
