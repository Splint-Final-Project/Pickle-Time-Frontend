import ChatListContainer from '@/components/chatList/ChatListContainer';
import styled from '@emotion/styled';

export default function ConversationList() {
  return (
    <S.Container>
      <S.Title>피클 메세지</S.Title>
      <ChatListContainer />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    padding: 8rem 1.8rem 8.5rem;
  `,
  Title: styled.h1`
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 2rem;
  `,
};

// const { data } = useGetMessages('2');
// const { mutate } = useSendMessage({ message: 'hi' }, '2');

// const handleClick = () => {
//   mutate();
// };
