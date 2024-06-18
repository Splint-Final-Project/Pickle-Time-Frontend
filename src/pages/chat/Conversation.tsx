import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useGetMessages from '@/hooks/message/useGetMessages';
import { useGetPickelDetail } from '@/hooks/query/pickles';

import useConversation from '@/hooks/zustand/useConversation';
import useSendMessage from '@/hooks/message/useSendMessage';
import useListenMessages from '@/hooks/message/useListenMessage';

import Message from '@/components/message/Message';

import LeftArrowIcon from '/public/icons/leftBlackArrow.svg';
import MenuIcon from '/icons/menu.svg';
import GongjiIcon from '/icons/Gongji.svg';
import BottomArrowIcon from '/icons/greenBottomArrow.svg';
import GalleryIcon from '/icons/galleryInMessage.svg';
import SendMessageIcon from '/icons/sendMessage.svg';

import styled from '@emotion/styled';
import useAuth from '@/hooks/zustand/useAuth';


export default function Conversation() {
  const { leaderId = '', pickleId='' } = useParams();

  // server state
  const { data: pickleData } = useGetPickelDetail(pickleId);

  // global state
  const { user } = useAuth();
  const { setSelectedConversation, setPickleId } = useConversation();
  const { messages, loading } = useGetMessages();
  const { sendMessage } = useSendMessage();
  
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

  // 전역 상태 리셋
  useEffect(() => {
    setSelectedConversation(leaderId);
    setPickleId(pickleId);
  }, [user, leaderId, pickleId]);

  return (
    <S.Container>
      <S.Header>
        <img src={LeftArrowIcon} />
        <S.HeaderTitle>{pickleData?.data.title}</S.HeaderTitle>
        <img src={MenuIcon} />
      </S.Header>
      <S.Gongji>
        <S.GongjiWrapper>
          <img src={GongjiIcon} />
          <S.GongjiText>공지</S.GongjiText>
        </S.GongjiWrapper>
        <img src={BottomArrowIcon} />
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
        <S.MessageImg src={SendMessageIcon}/>
      </S.MessageLayout>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    height: 100%;
    position: relative;
  `,

  Header: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 8rem;
    padding: 4rem 2rem 2rem;
  `,

  HeaderTitle: styled.span`
    color: #181f29;
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,

  ArrowIcon: styled.img`
    width: 0.7rem;
    height: 1.3rem;
    flex-shrink: 0;
    /* stroke-width: 1.5rem; */
    /* stroke: #181F29; */
  `,

  Gongji: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 2rem 2rem;
    width: 100%;
    height: 6.4rem;
    flex-shrink: 0;
    border-radius: 0px 0px 2rem 2rem;
    background: #e9f4f2;
  `,

  GongjiWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  
  GongjiText: styled.span`
    color: #181f29;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-weight: 500;
    font-style: normal;
    line-height: normal;
  `,

  MessageContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
  `,

  MessageLayout: styled.form`
    width: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    bottom: 8rem;
    margin: 2rem 1rem;
    gap: 1rem;
  `,

  InputWrapper: styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    height: 4.1rem;
    flex-shrink: 0;
    border-radius: 2.0rem;
    background: #F3F4F6;
    padding: 2rem;
    gap: 1rem;
  `,

  InputMessage: styled.input`
    width: 100%;
    border: none;
    background: #F3F4F6;
  `,

  MessageImg: styled.img`
    cursor: pointer;
  `

};
