import { authRequests } from '@/apis/auth.api';
import { SignUpFormValues } from '@/apis/types/auth.type';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isValid, errors },
  } = useForm<SignUpFormValues>();

  const [revealPw, setRevealPw] = useState(false);
  const [revealConfirmPw, setRevealConfirmPw] = useState(false);
  const navigate = useNavigate();
  async function handleSignUp(data: SignUpFormValues) {
    try {
      await authRequests.signUp(data);
      alert('회원가입 마무리 단계 페이지로 리다이렉팅됩니다');
      navigate('/sign-up2');
    } catch (e) {
      console.log(e);
    }
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
          <button type="submit" disabled={!isValid}>
            이메일로 시작하기
          </button>
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
