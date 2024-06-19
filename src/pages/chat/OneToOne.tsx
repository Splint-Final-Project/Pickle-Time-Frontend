import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useGetMessagesInOneToOne } from '@/hooks/message/useGetMessages';
import { useGetPickelDetail } from '@/hooks/query/pickles';
import useConversation from '@/hooks/zustand/useConversation';
import { useSendMessageOneToOne } from '@/hooks/message/useSendMessage';
import useListenMessages from '@/hooks/message/useListenMessage';

import Message from '@/components/message/Message';

import LeftArrowIcon from '/public/icons/leftBlackArrow.svg';
import MenuIcon from '/icons/menu.svg';
import GongjiIcon from '/icons/Gongji.svg';
import BottomArrowIcon from '/icons/greenBottomArrow.svg';
import GalleryIcon from '/icons/galleryInMessage.svg';
import SendMessageIcon from '/icons/sendMessage.svg';

import { S } from './Chat.style'
import useAuth from '@/hooks/zustand/useAuth';
import routes from '@/constants/routes';


export default function OneToOne() {
  const navigate = useNavigate();
  const { leaderId = '', pickleId='' } = useParams();

  // server state
  const { data: pickleData } = useGetPickelDetail(pickleId);

  // global state
  const { user } = useAuth();
  const { setLeaderId, setPickleId, clear } = useConversation();
  const { messages, loading } = useGetMessagesInOneToOne();
  const { sendMessage } = useSendMessageOneToOne();
  
  // local state
  const [message, setMessage] = useState("");

  // socket
  useListenMessages(user);

  const handleSendMessage = async (e: any, message: string) => {
    e.preventDefault();
    if (!message) return;

    await sendMessage(message);
    setMessage("");
  }

  const goBack = () => {
    clear();
    navigate(`${routes.chatList}`);
  }

  // 전역 상태 리셋
  useEffect(() => {
    setLeaderId(leaderId);
    setPickleId(pickleId);
  }, [user, leaderId, pickleId]);

  return (
    <S.Container>
      <S.Header>
        <S.BaseImg src={LeftArrowIcon} onClick={goBack}/>
        <S.HeaderTitle>{pickleData?.data.title}</S.HeaderTitle>
        <S.BaseImg src={MenuIcon} />
      </S.Header>
      <S.Gongji>
        <S.GongjiWrapper>
          <S.BaseImg src={GongjiIcon}/>
          <S.GongjiText>공지</S.GongjiText>
        </S.GongjiWrapper>
        <S.BaseImg src={BottomArrowIcon}/>
      </S.Gongji>
      <S.MessageContainer>
        {messages?.map((message: any) => (
          <Message message={message} key={message?._id}/>
        ))}
      </S.MessageContainer>
      <S.MessageLayout onSubmit={(e) => handleSendMessage(e, message)}>
        <S.InputWrapper>
          <img src={GalleryIcon}/>
          <S.InputMessage placeholder='메시지 입력' onChange={(e) => setMessage(e.target.value)} value={message}/>
        </S.InputWrapper>
        <S.MessageImg src={SendMessageIcon} onClick={(e) => handleSendMessage(e, message)}/>
      </S.MessageLayout>
    </S.Container>
  );
}
