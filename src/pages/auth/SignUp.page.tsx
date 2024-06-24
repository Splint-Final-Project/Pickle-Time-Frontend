import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import client from '@/apis/axios';

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
  VerifyButton,
} from './SignUpStyled';
import { showErrorToast, showToast } from '@/components/common/Toast';
import routes from '@/constants/routes';

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
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();
  async function handleSignUp(data: SignUpFormValues) {
    try {
      await signUp(data);
      navigate(routes.signUp2);
    } catch (e: any) {}
  }

  async function handleVerifyButtonClick() {
    if (errors?.email) {
      showErrorToast('이메일을 입력해 주세요.');
      return;
    }
    try {
      setIsFetching(true);
      await client.post('/auth/verify-email', { email: getValues('email') });
      showToast('인증번호가 전송되었습니다.');
      setIsVerificationOpen(true);
    } catch (e: any) {
      showErrorToast(e.response.data.error);
    } finally {
      setIsFetching(false);
    }
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
              autoComplete="new-password"
              disabled={isVerificationOpen}
              {...register('email', {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식으로 작성해 주세요.',
                },
              })}
            />
            <VerifyButton
              disabled={isFetching}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleVerifyButtonClick();
              }}
            >
              {isVerificationOpen ? '재전송' : '인증하기'}
            </VerifyButton>
          </InputContainer>
          {isVerificationOpen && (
            <InputContainer
              $isError={false}
              onClick={() => {
                const inputField = document.getElementById('verify') as HTMLInputElement;
                inputField.focus();
              }}
              style={{ marginTop: '5px', backgroundColor: '#fff', border: 'none', padding: '0 14px', height: '40px' }}
            >
              <InputField
                id="verifySearch"
                type="number"
                autoComplete="new-password"
                placeholder="인증번호 입력"
                {...register('verify', {
                  required: {
                    value: true,
                    message: '이메일 인증을 완료해 주세요.',
                  },
                  min: {
                    value: 100000,
                    message: '여섯 자리 숫자를 입력해 주세요.',
                  },
                  max: {
                    value: 999999,
                    message: '여섯 자리 숫자를 입력해 주세요.',
                  },
                })}
                style={{
                  borderBottom: '1px solid #e0e0e0',
                  height: '40px',
                  borderRadius: '0',
                }}
              />
            </InputContainer>
          )}
          {errors.verify?.message && <ErrorMessage>{errors.verify.message?.toString()}</ErrorMessage>}
        </FormField>

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
              autoComplete="new-password"
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
              autoComplete="new-password"
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
