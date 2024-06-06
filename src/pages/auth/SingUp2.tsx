import { authRequests } from '@/apis/auth.api';
import { SignUpFormValues2 } from '@/apis/types/auth.type';
import useAuth from '@/hooks/zustand/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Field, FieldSet, Form, Input, Label, Title, Subtitle } from '@/components/auth/AuthComponents';

export default function SignUp2() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormValues2>();

  const navigate = useNavigate();
  const { signUp2 } = useAuth();
  async function handleSignUp2(data: SignUpFormValues2) {
    try {
      await signUp2(data);
      alert('회원가입이 완료되었습니다. 홈 페이지로 이동합니다');
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <Subtitle>1분이면 끝나요</Subtitle>
      <Title>
        피클 타임과
        <br /> 함께 스터디해요!
      </Title>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleSignUp2)}
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
