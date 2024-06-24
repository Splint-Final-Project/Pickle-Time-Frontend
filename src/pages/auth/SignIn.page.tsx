import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export default function SignIn() {
  return (
    <Container>
      <StyledHomeLink to="/">
        <SubTitle>
          함께 공부하고 싶을 때
          <br />
          스터디 생성 플랫폼
        </SubTitle>

        <Logo src="images/logotext.svg" />
      </StyledHomeLink>
      <SocialStartButtons>
        <Button
          className="kakao-btn"
          onClick={() =>
            window.open(
              `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT}&response_type=code`,
              '_self',
            )
          }
        >
          <img src="/icons/kakaoBtnIcon.svg" />
          카카오톡으로 시작하기
        </Button>
        <Button
          className="naver-btn"
          onClick={() =>
            window.open(
              `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT}&state=${'abcde'}`,
              '_self',
            )
          }
        >
          <img src="/icons/naverBtnIcon.svg" />
          네이버로 시작하기
        </Button>
      </SocialStartButtons>
      <EmailActionRedirectors>
        <Link to="/sign-in-email">이메일로 로그인</Link>
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" viewBox="0 0 2 14" fill="none">
          <path d="M1 14L1 -3.72529e-08" stroke="#D0D0D0" strokeWidth="0.5" />
        </svg>
        <Link to="/sign-up">이메일로 회원가입</Link>
      </EmailActionRedirectors>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  min-height: 100dvh;
  padding: 8rem 3.2rem;
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.color.black};
  ${({ theme }) => theme.typography.subTitle1};

  @media (max-width: 630px) {
    font-size: 2.1rem;
  }
  @media (max-width: 450px) {
    font-size: 1.7rem;
  }
`;

export const Logo = styled.img`
  min-width: 21rem;
  max-width: 30rem;
  margin-top: 1rem;

  @media (max-width: 630px) {
    min-width: 18rem;
  }
  @media (max-width: 450px) {
    min-width: 15rem;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  height: 4.2rem;
  border-radius: 0.4rem;
  outline: none;
  ${({ theme }) => theme.typography.body1};

  &.kakao-btn {
    background-color: #fee500;
    color: #070104;
  }
  &.naver-btn {
    background-color: #0ac50a;
    color: #fff;
  }
`;

export const SocialStartButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
`;

export const EmailActionRedirectors = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  gap: 2.7rem;
  margin-top: 3rem;

  a {
    color: ${({ theme }) => theme.color.sub};
    ${({ theme }) => theme.typography.body2};
  }
`;

export const StyledHomeLink = styled(Link)`
  display: inline-block;
  margin-bottom: 28.8rem;
`;
