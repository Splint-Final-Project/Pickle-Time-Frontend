import styled from '@emotion/styled';

import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <Container>
      <SubTitle>
        어디서든 나를 위해
        <br /> 피클 타임하세요!
      </SubTitle>
      <Logo src="images/logotext.svg" />
      <SocialStartButtons>
        <Button
          style={{
            backgroundColor: '#FEE500',
            color: 'black',
          }}
          onClick={() =>
            window.open(
              `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT}&response_type=code`,
              '_self',
            )
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
            <path
              d="M2.29095 1.17891C4.62867 -0.508806 7.96767 -0.370858 10.1291 1.50546C12.3277 3.41536 12.6281 6.53381 10.8198 8.76782C9.11645 10.8718 6.04426 11.5652 3.48649 10.48L3.34679 10.4183L0.724279 10.9866L0.700297 10.9902L0.679312 10.9945H0.66852L0.655329 10.9976H0.632545L0.61276 11L0.600169 10.9994L0.586379 11L0.566593 10.9982H0.545608L0.532417 10.9957L0.519227 10.9945L0.498242 10.9902L0.477857 10.9872L0.468263 10.9847L0.453874 10.9817L0.424495 10.9719L0.410105 10.9689L0.40351 10.9658L0.39032 10.9615L0.363339 10.9493L0.345352 10.942L0.338757 10.9384L0.330363 10.9347L0.311776 10.9237L0.284795 10.9091L0.275202 10.9023L0.253018 10.8865L0.229035 10.87L0.227836 10.8675L0.220042 10.8621L0.19426 10.8376L0.179271 10.8254L0.175674 10.8212L0.142098 10.7833L0.134303 10.7748L0.127708 10.7662L0.104325 10.732L0.0959311 10.7204L0.0929332 10.7143L0.0677513 10.6698L0.0635543 10.6625L0.0611561 10.6576L0.0569591 10.6502L0.0485652 10.6271L0.0365738 10.6014L0.0341754 10.5917L0.0317771 10.5855L0.0215845 10.5483L0.0173875 10.5373L0.0161883 10.5282L0.0131906 10.5166L0.0101927 10.4964L0.00539616 10.4708L0.00419697 10.4519L0.00239825 10.4458V10.436L0 10.403L0.000599526 10.3811L0.00119919 10.367L0.00239825 10.3347L0.00479649 10.3194V10.3078L0.00959313 10.2865L0.0125909 10.2657L0.0155888 10.2535L0.0179871 10.2413L0.0287794 10.2047L0.0305781 10.1967L0.720083 8.09091L0.706892 8.06832C-0.618156 5.78121 -0.0179871 2.94658 2.15365 1.28145L2.29095 1.17891Z"
              fill="#070104"
            />
          </svg>
          카카오톡으로 시작하기
        </Button>
        <Button
          style={{
            backgroundColor: '#0AC50A',
            color: 'white',
          }}
          onClick={() =>
            window.open(
              `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT}&state=${'abcde'}`,
              '_self',
            )
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
            <path d="M3.88235 0H0V10H3.88235V5L7.11765 10H11V0H7.11765V5L3.88235 0Z" fill="white" />
          </svg>
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
  width: 310px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const Button = styled.button`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  outline: none;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const SocialStartButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const EmailActionRedirectors = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  gap: 27px;
  margin-top: 30px;
  a {
    color: #777;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const SubTitle = styled.h2`
  color: #000;
  font-family: Pretendard;
  font-size: 21px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 31.5px */
`;

export const Logo = styled.img`
  align-self: center;
  width: 50%;
  margin: 50px;
`;
