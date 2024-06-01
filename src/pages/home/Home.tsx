import { Link } from 'react-router-dom';

import useAuth from '@/hooks/zustand/useAuth';
import KaKaoMap from '@/components/map/KaKaoMap';
import routes from '@/constants/routes';
import BackDropModal from '@/components/common/modal/BackDropModal';
import { useState } from 'react';

import styled from '@emotion/styled';

const Button = styled.button`
  color: hotpink;
  border: 1px solid black;
`;

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // 전역 상태
  const { getUser, signOut } = useAuth();
  const user = getUser();

  return (
    <div>
      <h1>피클타임 홈 페이지</h1>
      <div>
        {user ? (
          <>
            안녕하세요 님 <button onClick={signOut}>로그아웃</button>
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
      <Button type="button" onClick={openModal}>
        모달 테스트 버튼
      </Button>
      <BackDropModal isOpen={isModalOpen} onClose={closeModal}>
        <div>티라노 앙</div>
      </BackDropModal>
    </div>
  );
}
