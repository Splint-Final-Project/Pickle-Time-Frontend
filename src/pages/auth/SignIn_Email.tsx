import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { showToast } from '@/components/common/Toast';
import useAuth from '@/hooks/zustand/useAuth';
import { SignInFormValues } from '@/apis/types/auth.type';

export default function SignIn_Email() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormValues>({
    mode: 'onBlur',
  });
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const handleSignIn: SubmitHandler<SignInFormValues> = async data => {
    try {
      const status = await signIn(data);
      if (status === 'pending') {
        showToast('추가 정보 입력 페이지로 이동할게요.');
        navigate('/sign-up2');
      } else {
        showToast('로그인 성공! 홈 페이지로 이동할게요!');
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Form
        autoComplete="off"
        onSubmit={handleSubmit(handleSignIn)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Title>로그인</Title>
        <FieldSet disabled={isSubmitting}>
          <Field>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@pickletime.com"
              $error={!!errors.email}
              {...register('email', {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식으로 작성해 주세요.',
                },
              })}
            />

            {errors.email?.message && <ErrorMessage>{errors.email.message?.toString()}</ErrorMessage>}
          </Field>
          <Field>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              $error={!!errors.password}
              // type={revealPw ? 'text' : 'password'}
              {...register('password', {
                required: true,
              })}
            />
          </Field>
          <Button
            type="submit"
            style={{
              backgroundColor: '#5DC26D',
              color: 'white',
            }}
          >
            로그인
          </Button>
        </FieldSet>
      </Form>
      <EmailSignupRedirectorLink>
        <span>아직 회원이 아니라면?</span>
        <Link to="/sign-up">이메일로 회원가입하기</Link>
      </EmailSignupRedirectorLink>
      <Or>
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="2" viewBox="0 0 96 2" fill="none">
          <path d="M0 1H96" stroke="#D0D0D0" strokeWidth="0.5" />
        </svg>
        <span>또는</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="2" viewBox="0 0 96 2" fill="none">
          <path d="M0 1H96" stroke="#D0D0D0" strokeWidth="0.5" />
        </svg>
      </Or>
      <SocialCircles>
        <SocialCircle
          onClick={() =>
            window.open(
              `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT}&response_type=code`,
              '_self',
            )
          }
        >
          <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="23.5" cy="23.5" r="23.5" fill="#FEE600" />
            <path
              d="M18.6411 17.0594C22.048 14.5439 26.9141 14.7495 30.0641 17.5461C33.2683 20.3928 33.7061 25.0408 31.0707 28.3706C28.5883 31.5065 24.111 32.54 20.3834 30.9225L20.1798 30.8306L16.3578 31.6776L16.3229 31.683L16.2923 31.6894H16.2766L16.2574 31.694H16.2242L16.1953 31.6976L16.177 31.6967L16.1569 31.6976L16.128 31.6949H16.0975L16.0782 31.6912L16.059 31.6894L16.0284 31.683L15.9987 31.6785L15.9847 31.6749L15.9638 31.6703L15.921 31.6557L15.9 31.6512L15.8904 31.6466L15.8711 31.6403L15.8318 31.6221L15.8056 31.6112L15.796 31.6057L15.7838 31.6003L15.7567 31.5839L15.7174 31.562L15.7034 31.552L15.671 31.5284L15.6361 31.5038L15.6343 31.5002L15.623 31.492L15.5854 31.4556L15.5636 31.4374L15.5583 31.431L15.5094 31.3746L15.498 31.3619L15.4884 31.3492L15.4543 31.2982L15.4421 31.2809L15.4377 31.2718L15.401 31.2054L15.3949 31.1945L15.3914 31.1872L15.3853 31.1763L15.3731 31.1417L15.3556 31.1035L15.3521 31.089L15.3486 31.0799L15.3338 31.0244L15.3276 31.008L15.3259 30.9943L15.3215 30.9771L15.3172 30.947L15.3102 30.9088L15.3084 30.8806L15.3058 30.8715V30.857L15.3023 30.8078L15.3032 30.7751L15.3041 30.7542L15.3058 30.7059L15.3093 30.6832V30.6659L15.3163 30.6341L15.3207 30.6031L15.325 30.5849L15.3285 30.5668L15.3442 30.5122L15.3469 30.5003L16.3517 27.3616L16.3325 27.328C14.4014 23.9191 15.2761 19.6941 18.441 17.2122L18.6411 17.0594Z"
              fill="#070104"
            />
          </svg>
          카카오톡
        </SocialCircle>
        <SocialCircle
          onClick={() =>
            window.open(
              `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT}&state=${'abcde'}`,
              '_self',
            )
          }
        >
          <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="23.5" cy="23.5" r="23.5" fill="#00C73C" />
            <path d="M21 16H15V31H21V23.5L26 31H32V16H26V23.5L21 16Z" fill="white" />
          </svg>
          네이버
        </SocialCircle>
      </SocialCircles>
    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 140px 32px 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h1`
  color: #292929;

  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 64px;
`;

export const Subtitle = styled.h4`
  color: #989898;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const FieldSet = styled.fieldset`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const Field = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const Label = styled.label`
  color: #2c2c2c;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Input = styled.input<{ $error: boolean }>`
  width: 100%;
  height: 44px;
  padding: 13px;
  color: black;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 4px;
  background-color: #f4f7f4;
  border: none;
  ::placeholder {
    color: #bababa;
  }
  ${props => (props.$error ? 'border: 1px solid red;' : '')};
  &:focus {
    border: 1px solid #888d88;
  }
`;

export const ErrorMessage = styled.span`
  /* position: absolute; */
  color: #d54040;

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const EmailSignupRedirectorLink = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin: 33px 0 118px;

  font-style: normal;
  font-weight: 400;
  line-height: normal;
  span {
    color: #777;

    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  a {
    color: #0ac50a;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    &hover {
      color: green;
    }
  }
`;

export const Or = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 11px;
  span {
    color: #777;

    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const SocialCircles = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

export const SocialCircle = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #ababab;

  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
