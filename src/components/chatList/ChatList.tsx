import { Link } from 'react-router-dom';
import useAuth from '@/hooks/zustand/useAuth';
// import { useGetConversationList } from '@/hooks/query/messages';
import Img from '@/assets/images/study-2.jpg';
import { CategoryType } from './CategoryFilterBar';
import styled from '@emotion/styled';

//목업 데이터
const testData = [
  {
    id: 1,
    imgUrl: Img,
    title: '겁나 뛰어 러닝 모임',
    lastMessageTime: '15:36',
    lastMessage: '안녕하세요!',
    notReadMessageCount: 5,
    category: '운동',
  },
  {
    id: 2,
    imgUrl: Img,
    title: '토익 850 목표 스터디',
    lastMessageTime: '14:20',
    lastMessage: '모임 언제 시작하나요?',
    notReadMessageCount: 3,
    category: '스터디',
  },
  {
    id: 3,
    imgUrl: Img,
    title: '헬스 다이어트',
    lastMessageTime: '12:45',
    lastMessage: '오늘 운동 같이 하실 분?',
    notReadMessageCount: 2,
    category: '운동',
  },
  {
    id: 4,
    imgUrl: Img,
    title: '프로그래밍 스터디',
    lastMessageTime: '09:30',
    lastMessage: '코드 리뷰 부탁드립니다.',
    notReadMessageCount: 8,
    category: '스터디',
  },
  {
    id: 5,
    imgUrl: Img,
    title: '독서 토론 모임',
    lastMessageTime: '08:15',
    lastMessage: '이번 주 주제는 무엇인가요?',
    notReadMessageCount: 1,
    category: '취미',
  },
  {
    id: 6,
    imgUrl: Img,
    title: '요가 클래스',
    lastMessageTime: '07:50',
    lastMessage: '수업 시간 변경되었습니다.',
    notReadMessageCount: 0,
    category: '운동',
  },
  {
    id: 7,
    imgUrl: Img,
    title: '여행 동호회',
    lastMessageTime: '06:10',
    lastMessage: '다음 여행지 추천 받습니다.',
    notReadMessageCount: 4,
    category: '취미',
  },
  {
    id: 8,
    imgUrl: Img,
    title: '전체 모임',
    lastMessageTime: '17:45',
    lastMessage: '모두가 참여할 수 있는 모임입니다.',
    notReadMessageCount: 7,
    category: '전체',
  },
  {
    id: 9,
    imgUrl: Img,
    title: '웹 개발 스터디',
    lastMessageTime: '16:30',
    lastMessage: '다음 주 발표 준비하세요.',
    notReadMessageCount: 5,
    category: '스터디',
  },
  {
    id: 10,
    imgUrl: Img,
    title: '사진 동호회',
    lastMessageTime: '18:00',
    lastMessage: '이번 주말 출사 갑니다.',
    notReadMessageCount: 2,
    category: '취미',
  },
];

interface ChatListProps {
  currentCategory: CategoryType;
  searchValue: string;
}

//TODO : React-query 및 currentCategory, searchValue를 이용한 api호출
export default function ChatList({ currentCategory, searchValue }: ChatListProps) {
  const regex = new RegExp(searchValue, 'i');
  const filterData = testData.filter(
    item => (currentCategory === '전체' ? true : item.category === currentCategory) && regex.test(item.title),
  );

  // 전역 상태
  const { user, signOut } = useAuth();

  // server state
  // const { data } = useGetConversationList(user._id);
  // console.log(data)

  return (
    <S.Container>
      {currentCategory === '전체' && searchValue === ''
        ? testData.map(item => (
            <li key={item.id}>
              <ChatListItem chatData={item} />
            </li>
          ))
        : filterData.map(item => (
            <li key={item.id}>
              <ChatListItem chatData={item} />
            </li>
          ))}
    </S.Container>
  );
}

function ChatListItem({ chatData }: { chatData: any }) {
  const time = timeParsed(chatData.lastMessageTime);
  return (
    <S.Item to={'/'}>
      <S.ItemInner>
        <S.ItemImg alt="피클 이미지" src={chatData.imgUrl} />
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
  const hour = time.slice(0, 1);
  if (Number(hour) >= 12) {
    return `오후 ${Number(hour) === 12 ? 12 : Number(hour) - 12}:${time.slice(3)}`;
  }
  return `오전 ${time}`;
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
