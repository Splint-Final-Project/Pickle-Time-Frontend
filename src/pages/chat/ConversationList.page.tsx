import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import ChatListContainer from '@/components/chatList/ChatListContainer';

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
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    padding: 6rem 3.5rem 8.5rem;
  `,
  Title: styled.h1`
    display: flex;
    align-items: center;
    gap: 2.2rem;
    ${({ theme }) => theme.typography.header};

    img {
      height: 1.6rem;
      cursor: pointer;
    }
  `,
};
