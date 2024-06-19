import { Link } from 'react-router-dom';
import useAuth from '@/hooks/zustand/useAuth';
import { CategoryType } from './CategoryFilterBar';
import styled from '@emotion/styled';
import { useGetConversations } from '@/hooks/query/conversation';

import routes from '@/constants/routes';


interface ChatListProps {
  currentCategory: CategoryType;
  searchValue: string;
}

export default function ChatList({ currentCategory, searchValue }: ChatListProps) {
  const regex = new RegExp(searchValue, 'i');
  console.log(searchValue);
  // server state
  const { data } = useGetConversations(currentCategory);

  return (
    <S.Container>
      {data?.data.map((conversation: any) => (
        <li key={conversation._id}>
          <ChatListItem chatData={conversation} />
        </li>
      ))}
      {/* {currentCategory === '전체' && searchValue === ''
        ? testData.map(item => (
            <li key={item.id}>
              <ChatListItem chatData={item} />
            </li>
          ))
        : filterData.map(item => (
            <li key={item.id}>
              <ChatListItem chatData={item} />
            </li>
          ))} */}
    </S.Container>
  );
}

function ChatListItem({ chatData }: { chatData: any }) {
  const time = timeParsed(chatData.updatedAt);

  return (
    <S.Item to={{
      pathname: `${routes.chat}/${chatData?.pickleId}/${chatData._id}`,
      // search: params.toString(),
    }}>
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
          <S.ItemLastMessage>{chatData.lastMessage}</S.ItemLastMessage>
        </S.ItemTextContent>
      </S.ItemInner>
    </S.Item>
  );
}

function timeParsed(time: string) {
  const date = new Date(time);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? '오후' : '오전';

  hours = hours % 12;
  hours = hours ? hours : 12; 
  
  return `${period} ${hours}시 ${minutes}분`;
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
};
