import { authRequests } from '@/apis/index';
import { SignUpFormValues } from '@/apis/types/authTypes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormValues>();

  const [revealPw, setRevealPw] = useState(false);
  const [revealConfirmPw, setRevealConfirmPw] = useState(false);
  const navigate = useNavigate();
  async function handleSignUp(data: SignUpFormValues) {
    try {
      await authRequests.signup(data);
      alert('회원가입 성공');
    } catch (e) {
      console.log(e);
    }
    // navigate('/sign-in');
  }
  return (
    <div>
      회원가입
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleSignUp)}
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
          </div>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="nickname"
              placeholder="닉네임을 입력해 주세요"
              {...register('nickname', {
                required: true,
                minLength: {
                  value: 2,
                  message: '2자 이상 입력해 주세요.',
                },
              })}
            />
            {errors.nickname && <span>{errors.nickname.message?.toString()}</span>}
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type={revealPw ? 'text' : 'password'}
              placeholder="8자 이상 입력해 주세요"
              {...register('password', {
                required: true,
                minLength: {
                  value: 8,
                  message: '8자 이상 입력해 주세요.',
                },
              })}
            />
            <img
              onClick={() => setRevealPw(prev => !prev)}
              src={revealPw ? '/icons/hide.svg' : '/icons/reveal.svg'}
              alt="reveal"
            />
            {errors.password && <span>{errors.password.message?.toString()}</span>}
          </div>
          <div>
            <label htmlFor="checkPassword">비밀번호 확인</label>
            <input
              id="checkPassword"
              type={revealConfirmPw ? 'text' : 'password'}
              placeholder="비밀번호를 한번 더 입력해 주세요"
              {...register('checkPassword', {
                required: true,
                validate: v => v === getValues('password') || '비밀번호가 일치하지 않습니다.',
              })}
            />
            <img
              onClick={() => setRevealConfirmPw(prev => !prev)}
              src={revealConfirmPw ? '/icons/hide.svg' : '/icons/reveal.svg'}
              alt="reveal"
            />
            {errors.checkPassword && <span>{errors.checkPassword.message?.toString()}</span>}
          </div>
          <button type="submit">회원가입</button>
        </fieldset>
      </form>
      <br />
      <br />
      <br />
      <br />
      <button>카카오로 시작하기</button>
      <button disabled>네이버로 시작하기</button>
    </div>
  );
}
