import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

//Todo : 임시제작! 디자인 생기면 수정
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Error>404🥒</S.Error>
      <div className="message">
        요청하신 페이지를 찾을 수 없습니다...🥹
        <br />
      </div>
      <S.GoBack
        onClick={() => {
          navigate(-1);
        }}
      >
        이전 페이지로 돌아가기
      </S.GoBack>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    padding-top: 22rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    .message {
      font-size: 1.8rem;
      color: #777;
    }
  `,

  Error: styled.div`
    padding-bottom: 2rem;
    font-size: 14rem;
    font-weight: 600;
  `,

  GoBack: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1.2rem;
    margin-top: 5rem;
    border: 1px solid ${({ theme }) => theme.color.primary};
    border-radius: 0.8rem;
    font-size: 1.6rem;
    font-weight: 500;
    background-color: #f7f9f7;

    &:hover {
      background-color: ${({ theme }) => theme.color.primary};
    }
  `,
};
