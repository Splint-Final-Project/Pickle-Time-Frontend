import useAuth from '@/hooks/zustand/useAuth';
import styled from '@emotion/styled';

function extractTime(dateString: string) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

function padZero(number: number) {
	return number.toString().padStart(2, "0");
}

export default function Message({message}: {message: any}) {
  const { user } = useAuth();

  const fromMe = user?._id === message?.senderId;

  return (
    <S.Container fromMe={fromMe}>
      <S.TextContainer>
        <S.Text fromMe={fromMe}>{message?.message}</S.Text>
      </S.TextContainer>
    </S.Container>
  )
}

const S = {
  Container: styled.div<{fromMe: boolean}>`
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    min-height: 4.1rem;
    max-width: 22.6rem;
    height: auto;
    border-radius: ${(props) => (props.fromMe ? '2.0rem 1.0rem 2.0rem 2.0rem' : '1.0rem 2.0rem 2.0rem 2.0rem')};
    background: ${(props) => (props.fromMe ? '#5DC26D' : '#F3F4F6')};
    align-self: ${(props) => (props.fromMe ? 'flex-end' : 'flex-start')};
    word-wrap: break-word;
    margin: 0.5rem 0;
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
  Text: styled.span<{fromMe: boolean}>`
    color: ${(props) => (props.fromMe ? '#FFF' : '#3F3F3F')};
    font-family: Pretendard;
    font-size: 1.4rem;
    font-weight: 400;
    font-style: normal;
    line-height: normal;
  `
}
