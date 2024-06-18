import { useParams } from 'react-router-dom';

import MessageList from '@/components/message/MessageList';
import { useGetMessages } from '@/hooks/query/messages';
import { useGetPickelDetail } from '@/hooks/query/pickles';
import LeftArrowIcon from '/public/icons/leftBlackArrow.svg';
import MenuIcon from '/icons/menu.svg';
import GongjiIcon from '/icons/Gongji.svg';
import BottomArrowIcon from '/icons/greenBottomArrow.svg';
import GalleryIcon from '/icons/galleryInMessage.svg';
import SendMessageIcon from '/icons/sendMessage.svg';

import styled from '@emotion/styled';
import Message from '@/components/message/Message';

export default function Conversation() {
  const { leaderId = '', pickleId = '' } = useParams();

  // server state
  const { data: pickleData } = useGetPickelDetail(pickleId);
  const { data } = useGetMessages(leaderId);

  return (
    <div>
      <S.Header>
        <img src={LeftArrowIcon} />
        <S.HeaderTitle>{pickleData?.data.title}</S.HeaderTitle>
        <img src={MenuIcon} />
      </S.Header>
      <S.Gongji>
        <S.GongjiWrapper>
          <img src={GongjiIcon}/>
          <S.GongjiText>공지</S.GongjiText>
        </S.GongjiWrapper>
        <img src={BottomArrowIcon}/>
      </S.Gongji>
      {/* <Message/> */}
      {data?.map((message: string) => (
        <Message message={message}/>
      ))}
      <S.MessageLayout>
        <S.InputWrapper>
          <img src={GalleryIcon}/>
          <S.InputMessage placeholder='메시지 입력'/>
        </S.InputWrapper>
        <img src={SendMessageIcon} />
        </S.MessageLayout>
    </div>
  );
}

const S = {
  Container: styled.div`
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
    border-radius: 0px 0px 2.0rem 2.0rem;
    background: #E9F4F2;
  `,

  GongjiWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
  ,

  GongjiText: styled.span`
    color: #181F29;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-weight: 500;
    font-style: normal;
    line-height: normal;
  `,

  MessageLayout: styled.div`
    width: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    bottom: 9rem;
    margin: 2rem auto;
    gap: 1rem;
  `,

  InputWrapper: styled.div`
    display: flex;
    align-items: center;
    width: 85%;
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
};
