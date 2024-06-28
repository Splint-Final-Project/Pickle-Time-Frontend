import useAuth from '@/hooks/zustand/useAuth';
import MessageDefaultProfileIcon from '/icons/messageProfile.svg';
import styled from '@emotion/styled';

function extractTime(dateString: string) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

function padZero(number: number) {
  return number.toString().padStart(2, '0');
}

export default function Message({ message }: { message: any }) {
  const { user } = useAuth();
  const time = extractTime(message.updatedAt);
  const fromMe = user?._id === message?.senderId;

  return (
    <S.Container fromMe={fromMe}>
      {fromMe ? (
        <>
          <S.OutSide fromMe={fromMe}>
            <S.OutsideNumberText>{message?.unReadNumber}</S.OutsideNumberText>
            <S.OutSideTimeText>{time}</S.OutSideTimeText>
          </S.OutSide>
          <S.MessageAndNick fromMe={fromMe}>
            <S.NickNameText>{message?.senderNickname}</S.NickNameText>
            <S.MessageContainer fromMe={fromMe}>
              <S.TextContainer>
                <S.Text fromMe={fromMe}>{message?.message}</S.Text>
              </S.TextContainer>
            </S.MessageContainer>
          </S.MessageAndNick>
          {message?.profilePic ? <S.OutsideProfile src={message?.profilePic} alt='이미지'/> : <S.OutsideProfile src={MessageDefaultProfileIcon} alt='이미지'/>}
        </>
      ) : (
        <>
          {message?.profilePic ? <S.OutsideProfile src={message?.profilePic} alt='이미지'/> : <S.OutsideProfile src={MessageDefaultProfileIcon} alt='이미지'/>}
          <S.MessageAndNick fromMe={fromMe}>
            <S.NickNameText>{message?.senderNickname}</S.NickNameText>
            <S.MessageContainer fromMe={fromMe}>
              <S.TextContainer>
                <S.Text fromMe={fromMe}>{message?.message}</S.Text>
              </S.TextContainer>
            </S.MessageContainer>
          </S.MessageAndNick>
          <S.OutSide fromMe={fromMe}>
          <S.OutsideNumberText>{message?.unReadNumber}</S.OutsideNumberText>
            <S.OutSideTimeText>{time}</S.OutSideTimeText>
          </S.OutSide>
        </>
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div<{ fromMe: boolean }>`
    align-self: ${props => (props.fromMe ? 'flex-end' : 'flex-start')};
    position: relative;
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 0.8em;
  `,

  MessageContainer: styled.div<{ fromMe: boolean }>`
    flex-shrink: 0;
    max-width: 22.6rem;
    height: auto;
    min-height: 4.1rem;
    margin: 0.8rem 0;
    border-radius: ${props => (props.fromMe ? '2.0rem 1.0rem 2.0rem 2.0rem' : '1.0rem 2.0rem 2.0rem 2.0rem')};
    background: ${props => (props.fromMe ? '#5DC26D' : '#F3F4F6')};
    word-wrap: break-word;
  `,

  TextContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-shrink: 0;
    width: 100%;
    min-height: 4.1rem;
    padding: 1rem;
    word-wrap: break-word;
  `,

  Text: styled.span<{ fromMe: boolean }>`
    color: ${props => (props.fromMe ? '#FFF' : '#3F3F3F')};
    ${({ theme }) => theme.typography.chat}
  `,

  OutSide: styled.div<{ fromMe: boolean }>`
    display: flex;
    flex-direction: column;
    margin-bottom: -3.5rem;
    align-items: ${props => (props.fromMe ? 'flex-end' : 'flex-start')};
  `,

  MessageAndNick: styled.div<{ fromMe: boolean }>`
  display: flex;
  flex-direction: column;
  /* margin-bottom: -.5rem; */
  align-items: ${props => (props.fromMe ? 'flex-end' : 'flex-start')};
  `,


  OutsideNumberText: styled.span`
    color: ${({ theme }) => theme.color.basic};
    font-size: 1rem;
    font-weight: 400;
    line-height: normal;
  `,

  OutSideTimeText: styled.span`
    color: ${({ theme }) => theme.color.sub};
    font-size: 1rem;
    font-weight: 400;
    line-height: normal;
  `,

  OutsideProfile: styled.img`
    width: 33px;
    height: 33px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #D9D9D9;
  `,

  NickNameText: styled.div`
    color: var(--Basic, #181F29);

    /* Caption */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `
};
