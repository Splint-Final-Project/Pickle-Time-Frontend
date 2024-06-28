import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useGetMessages } from '@/hooks/message/useGetMessages';
import { useGetPickleDetail } from '@/hooks/query/pickles';

import useConversation from '@/hooks/zustand/useConversation';
import { useSendMessage } from '@/hooks/message/useSendMessage';
import useListenMessages from '@/hooks/message/useListenMessage';

import Message from '@/components/message/Message';

import LeftArrowIcon from '/public/icons/leftBlackArrow.svg';
import MenuIcon from '/icons/menu.svg';
import GongjiIcon from '/icons/Gongji.svg';
import BottomArrowIcon from '/icons/greenBottomArrow.svg';
import GalleryIcon from '/icons/galleryInMessage.svg';
import SendMessageIcon from '/icons/sendMessage.svg';

import { S } from './Chat.style';
import useAuth from '@/hooks/zustand/useAuth';
import routes from '@/constants/routes';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function Conversation() {
  const { pickleId = '', conversationId = '' } = useParams();

  // server state
  const { data: pickleData } = useGetPickleDetail(pickleId);

  // local state
  const [page, setPage] = useState(1); 
  const [message, setMessage] = useState('');

  // global state
  const { user } = useAuth();
  const { setConversationId, setPickleId, clear, nextPage } = useConversation();
  const { messages, loading } = useGetMessages(page);
  const { sendMessage } = useSendMessage();

  const handlePage = () => {
    if (nextPage > page) {
      setPage(nextPage);
    }
  }

  const navigate = useNavigate();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const messageObserverRef = useRef<HTMLDivElement | null>(null);
  const observer = useIntersectionObserver(handlePage, messageObserverRef);

  // socket
  useListenMessages(user);

  const handleSendMessage = async (e: any, message: string) => {
    e.preventDefault();
    if (!message) return;

    await sendMessage(message);
    setMessage('');
  };

  const goBack = () => {
    clear();
    navigate(`${routes.chatList}`);
  };

  // 전역 상태 리셋
  useEffect(() => {
    setConversationId(conversationId);
    setPickleId(pickleId);
  }, [user, conversationId, pickleId]);

  useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  return (
    <S.Container>
      <S.Header>
        <S.BaseImg src={LeftArrowIcon} onClick={goBack} />
        <S.HeaderTitle>{pickleData?.data.title}</S.HeaderTitle>
        <S.BaseImg src={MenuIcon} />
      </S.Header>
      <S.Gongji>
        <S.GongjiWrapper>
          <S.BaseImg src={GongjiIcon} />
          <S.GongjiText>공지</S.GongjiText>
        </S.GongjiWrapper>
        <S.BaseImg src={BottomArrowIcon} />
      </S.Gongji>
      <S.MessageContainer>
        <div ref={messageObserverRef}/>
        {messages && messages?.map((message: any) => (
          <S.ForRefInMessageContainer ref={lastMessageRef} key={message._id}>
            {message?.isTrack ? (
              <iframe
                src={`https://open.spotify.com/embed/track/${message.message}`}
                width="300"
                height="380"
                frameBorder="0"
                allow="encrypted-media"
              ></iframe>
            ) : (
              <Message message={message} key={message._id} />
            )}
          </S.ForRefInMessageContainer>
        ))}
      </S.MessageContainer>
      <S.MessageLayout onSubmit={e => handleSendMessage(e, message)}>
        <S.InputWrapper>
          <img src={GalleryIcon} />
          <S.InputMessage placeholder="메시지 입력" onChange={e => setMessage(e.target.value)} value={message} />
        </S.InputWrapper>
        <S.MessageImg src={SendMessageIcon} onClick={e => handleSendMessage(e, message)} />
      </S.MessageLayout>
    </S.Container>
  );
}
