import ChatListContainer from '@/components/chatList/ChatListContainer';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

export default function ConversationList() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Title>
        <img
          src="/icons/back.svg"
          alt="back"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div>피클 메세지</div>
      </S.Title>
      <ChatListContainer />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 6rem 3.5rem 8.5rem;
  `,
  Title: styled.h1`
    display: flex;
    align-items: center;
    gap: 22px;
    color: var(--Basic, #181f29);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    img {
      height: 16px;
      cursor: pointer;
    }
  `,
};
