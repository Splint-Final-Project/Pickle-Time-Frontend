import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { CategoryType } from './CategoryFilterBar';
import { useGetConversations } from '@/hooks/query/conversation';
import routes from '@/constants/routes';

interface ChatListProps {
  currentCategory: CategoryType;
  searchValue: string;
}

export default function ChatList({ currentCategory, searchValue }: ChatListProps) {
  const { data } = useGetConversations(currentCategory);
  console.log(data);

  const filteredData =
    data?.data.sort((a: any, b: any) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }) || [];

  return (
    <S.Container>
      {filteredData.map((conversation: any) => (
        <li key={conversation._id}>
          <ChatListItem chatData={conversation} />
        </li>
      ))}
    </S.Container>
  );
}

function ChatListItem({ chatData }: { chatData: any }) {
  const time = timeParsed(chatData.updatedAt);
  return (
    <S.Item
      to={{
        pathname: `${routes.chat}/${chatData?.pickleId}/${chatData._id}`,
      }}
    >
      <S.ItemInner>
        <S.ItemImg alt="피클 이미지" src={chatData.imageUrl} />
        <S.ItemTextContent>
          <S.Wrap>
            <S.ItemTitle>
              {chatData.title}
              <S.AlertMessageCount>
                {!chatData.notReadMessageCount ? '' : `${chatData.notReadMessageCount}`}
              </S.AlertMessageCount>
            </S.ItemTitle>
            <S.ItemLastMessageTime dateTime={chatData.lastMessageTime}>{time}</S.ItemLastMessageTime>
          </S.Wrap>
          {chatData?.lastMessageIsTrack ? (
            <S.ItemLastMessage>뮤직 트랙</S.ItemLastMessage>
          ) : (
            <S.ItemLastMessage>{chatData.lastMessage}</S.ItemLastMessage>
          )}
        </S.ItemTextContent>
        <S.UnreadBadge>{chatData?.unReadNumber}</S.UnreadBadge>
      </S.ItemInner>
    </S.Item>
  );
}

function timeParsed(time: string) {
  const currentDate = new Date();
  const messageDate = new Date(time);
  const diffInMilliseconds = currentDate.getTime() - messageDate.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays < 1) {
    let hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    const period = hours >= 12 ? '오후' : '오전';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${period} ${hours}시 ${minutes}분`;
  } else {
    return `${diffInDays}일 전`;
  }
}

const S = {
  Container: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  `,
  Item: styled(Link)`
    display: block;
    width: 100%;
    padding-bottom: 1.8rem;
    border-bottom: 1px solid #d0d0d0;
    position: relative;
    font-size: 1.4rem;
  `,
  ItemInner: styled.div`
    display: flex;
    gap: 1.5rem;
  `,
  ItemImg: styled.img`
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 1.5rem;
    background: #d9d9d9;
  `,
  ItemTextContent: styled.div`
    flex: 1;
  `,
  ItemTitle: styled.div`
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: inline-block;
  `,
  ItemLastMessage: styled.span`
    font-weight: 400;
    color: #8b8d94;
  `,
  ItemLastMessageTime: styled.time`
    font-size: 1.2rem;
    color: #8b8d94;
  `,
  Wrap: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0.2rem;
  `,
  AlertMessageCount: styled.span`
    color: #8b8d94;
    margin-left: 0.5rem;
    font-weight: 400;
  `,
  UnreadBadge: styled.div`
    position: absolute;
    top: 1.7rem;
    right: 0.2rem;
    padding: 0.5rem;
    border: 1px solid red;
    border-radius: 10rem;
    background-color: red;
    color: white;
  `
};
