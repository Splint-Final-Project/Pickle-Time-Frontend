import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { SignUpFormValues } from '@/apis/types/auth.type';
import useAuth from '@/hooks/zustand/useAuth';
import {
  Container,
  SubTitle,
  Title,
  Form,
  FormField,
  Label,
  InputContainer,
  InputLabel,
  InputField,
  InputButton,
  ErrorMessage,
  SubmitButton,
} from './SignUpStyled';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, isValid, errors },
  } = useForm<SignUpFormValues>({ mode: 'onBlur' });

  const [revealPw, setRevealPw] = useState(false);
  const [revealConfirmPw, setRevealConfirmPw] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();
  async function handleSignUp(data: SignUpFormValues) {
    try {
      await signUp(data);
      navigate('/sign-up2');
    } catch (e: any) {}
  }

  return (
    <Container>
      <SubTitle>1분이면 끝나요</SubTitle>
      <Title>
        피클 타임과
        <br /> 함께 스터디해요!
      </Title>
      <Form onSubmit={handleSubmit(handleSignUp)}>
        <FormField disabled={isSubmitting}>
          <Label>이메일을 작성해 주세요</Label>
          <InputContainer
            $isError={!!errors.email}
            onClick={() => {
              const inputField = document.getElementById('email') as HTMLInputElement;
              inputField.focus();
            }}
          >
            <InputLabel>이메일</InputLabel>
            <InputField
              id="email"
              type="email"
              placeholder="user@pickletime.com"
              autoComplete="off"
              {...register('email', {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식으로 작성해 주세요.',
                },
              })}
            />
            <InputButton
              src="/icons/clear.svg"
              alt="clear"
              onClick={e => {
                e.stopPropagation();
                setValue('email', '', { shouldValidate: true });
              }}
            />
          </InputContainer>
          {errors.email?.message && <ErrorMessage>{errors.email.message?.toString()}</ErrorMessage>}
        </FormField>
        <span>TODO: 이메일 중복 확인 및 이메일 인증 로직</span>

        <FormField disabled={isSubmitting}>
          <Label>비밀번호를 작성해 주세요</Label>
          <InputContainer
            $isError={!!errors.password}
            onClick={() => {
              const inputField = document.getElementById('password') as HTMLInputElement;
              inputField.focus();
            }}
          >
            <InputLabel>비밀번호</InputLabel>
            <InputField
              id="password"
              type={revealPw ? 'text' : 'password'}
              placeholder="********"
              autoComplete="off"
              {...register('password', {
                required: true,
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.',
                },
              })}
            />
            <InputButton
              src={revealPw ? '/icons/unreveal.svg' : '/icons/reveal.svg'}
              alt={revealPw ? 'reveal' : 'reveal'}
              onClick={e => {
                e.stopPropagation();
                setRevealPw(prevState => !prevState);
              }}
            />
          </InputContainer>
          {errors.password?.message && <ErrorMessage>{errors.password.message?.toString()}</ErrorMessage>}
        </FormField>

        <FormField disabled={isSubmitting}>
          <Label>비밀번호를 다시 한 번 작성해 주세요</Label>
          <InputContainer
            $isError={!!errors.checkPassword}
            onClick={() => {
              const inputField = document.getElementById('checkPassword') as HTMLInputElement;
              inputField.focus();
            }}
          >
            <InputLabel>비밀번호 확인</InputLabel>
            <InputField
              id="checkPassword"
              type={revealConfirmPw ? 'text' : 'password'}
              placeholder="********"
              autoComplete="off"
              {...register('checkPassword', {
                required: true,
                validate: value => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
              })}
            />
            <InputButton
              src={revealConfirmPw ? '/icons/unreveal.svg' : '/icons/reveal.svg'}
              alt={revealConfirmPw ? 'reveal' : 'reveal'}
              onClick={e => {
                e.stopPropagation();
                setRevealConfirmPw(prevState => !prevState);
              }}
            />
          </InputContainer>
          {errors.checkPassword?.message && <ErrorMessage>{errors.checkPassword.message?.toString()}</ErrorMessage>}
        </FormField>
        <SubmitButton type="submit" disabled={!isValid}>
          다음
        </SubmitButton>
      </Form>
    </Container>
  );
}
