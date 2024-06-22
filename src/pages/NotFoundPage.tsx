import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import routes from '@/constants/routes';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Error>
        <span>4</span>
        <img src="icons/sadCharacterIcon.svg" alt="슬픈 메인 캐릭터" />
        <span>4</span>
      </S.Error>
      <h1>Page not found.</h1>
      <h3>페이지를 열 수 없어요!</h3>

      <S.GoBack
        onClick={() => {
          navigate(routes.home);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path
            d="M6.38477 1L1.00015 6L6.38477 11"
            stroke="#5DC26D"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>다시 홈으로 돌아가기</span>
      </S.GoBack>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28rem 2rem;

    gap: 1rem;

    h1 {
      color: ${({ theme }) => theme.color.primary};
      font-family: 'Poppins';
      font-size: 2.5rem;
      font-weight: 700;
      line-height: normal;
    }

    h3 {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.subTitle3};
    }
  `,

  Error: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    margin-bottom: 0.5rem;

    span {
      color: #3f444a;
      font-family: 'Poppins';
      font-size: 8rem;
      font-weight: 700;
      line-height: normal;
    }

    img {
      margin-top: -0.5rem;
      cursor: auto;
    }
  `,

  GoBack: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    position: absolute;
    bottom: 5.5rem;

    span {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.subTitle2};
    }
  `,
};
