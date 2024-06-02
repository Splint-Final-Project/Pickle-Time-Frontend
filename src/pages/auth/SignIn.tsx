import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/zustand/useAuth';
import { SignInFormValues } from '@/apis/types/auth.type';
import { useState } from 'react';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormValues>();

  const [revealPw, setRevealPw] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const handleSignIn: SubmitHandler<SignInFormValues> = async data => {
    try {
      // console.log(data);
      const status = await signIn(data);
      if (status === 'Pending') {
        alert('추가 정보 입력 페이지로 이동');
        navigate('/sign-up2');
      } else {
        alert('로그인 성공! 홈 페이지로 이동합니다.');
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <Link to="/">Home</Link>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleSignIn)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <fieldset disabled={isSubmitting}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              {...register('email', {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식으로 작성해 주세요.',
                },
              })}
            />
            {errors.email && <span>{errors.email.message?.toString()}</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={revealPw ? 'text' : 'password'}
              {...register('password', {
                required: true,
              })}
            />
            <img
              onClick={() => setRevealPw(prev => !prev)}
              src={revealPw ? '/icons/hide.svg' : '/icons/reveal.svg'}
              alt="reveal"
            />
            {errors.password && <span>{errors.password.message?.toString()}</span>}
          </div>
          <button type="submit">로그인</button>
        </fieldset>
      </form>
      <button
        onClick={() =>
          window.open(
            'https://github.com/login/oauth/authorize' + `?client_id=${import.meta.env.VITE_GITHUB_CLIEND_ID}`,
            '_self',
          )
        }
      >
        깃허브로 로그인
      </button>
      <button>카카오로 로그인</button>
      <button disabled>네이버로 로그인</button>
      <div>
        <span>아직 회원이 아니신가요?</span>
        <Link to="/sign-up">가입하기</Link>
      </div>
    </div>
  );
}
