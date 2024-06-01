import { authRequests } from '@/apis/auth.api';
import { SignUpFormValues2 } from '@/apis/types/auth.type';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function SignUp2() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormValues2>();

  const navigate = useNavigate();
  async function handleSignUp(data: SignUpFormValues2) {
    try {
      // await authRequests.signUp2(data);
      alert('회원가입 완료. 로그인 페이지로 이동합니다');
      navigate('/sign-in');
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      회원가입 마무리하기 (아직 한 단계 남았어요!)
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleSignUp)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <fieldset disabled={isSubmitting}>
          <div>
            <label htmlFor="nickname">닉네임(필수)</label>
            <input
              id="nickname"
              type="text"
              placeholder="이름을 입력해 주세요"
              {...register('nickname', {
                required: true,
              })}
            />
          </div>
          <div>
            <label htmlFor="phone">프로필 사진 업로드(선택)</label>
          </div>
          <div>
            <label htmlFor="phone">회사 정보 입력(선택)</label>
          </div>
          <button type="submit">회원가입 완료하기</button>
        </fieldset>
      </form>
    </div>
  );
}
