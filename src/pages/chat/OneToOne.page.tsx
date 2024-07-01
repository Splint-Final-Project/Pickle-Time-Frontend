import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useGetInfiniteMessagesInOneToOne, useSendMessageOneToOne, useMessageSocketInOneToOne } from '@/hooks/query/messages';
import { useGetPickleDetail } from '@/hooks/query/pickles';

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
import useSocket from '@/hooks/zustand/useSocket';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function OneToOne() {
  // socket
  const { socket, initializeSocket, closeSocket } = useSocket();
  
  const navigate = useNavigate();
  const { leaderId = '', pickleId = '' } = useParams();

  // server state
  const { data: pickleData } = useGetPickleDetail(pickleId);
  const { data: messagesData, fetchNextPage } = useGetInfiniteMessagesInOneToOne(leaderId, pickleId);
  const { mutate } = useSendMessageOneToOne(leaderId, pickleId);
  useMessageSocketInOneToOne(socket, leaderId, pickleId);

  // global state
  const { user } = useAuth();

  // local state
  const [message, setMessage] = useState('');

  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const messageObserverRef = useRef<HTMLDivElement | null>(null);
  useIntersectionObserver(fetchNextPage, messageObserverRef);

  const handleSendMessage = async (e: any, message: string) => {
    e.preventDefault();
    if (!message) return;

    mutate({message});
    setMessage('');
  };

  const goBack = () => {
    navigate(`${routes.chatList}`);
  };

  useEffect(() => {
    initializeSocket(user._id);

    return () => {
      closeSocket();
    };
  }, [user._id, initializeSocket, closeSocket]);

  useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messagesData]);

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
        {messagesData && messagesData?.map((message: any) => (
          <S.ForRefInMessageContainer ref={lastMessageRef} key={message._id} >
            <Message message={message} key={message._id} />
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
