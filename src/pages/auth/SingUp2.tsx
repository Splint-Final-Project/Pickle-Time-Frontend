import { authRequests } from '@/apis/auth.api';
import { SignUpFormValues2 } from '@/apis/types/auth.type';
import useAuth from '@/hooks/zustand/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
  FinishButton,
} from './SignUpStyled';

export default function SignUp2() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, isValid, errors },
  } = useForm<SignUpFormValues2>({ mode: 'onBlur' });

  const navigate = useNavigate();
  const { signUp2 } = useAuth();
  async function handleSignUp2(data: SignUpFormValues2) {
    console.log(data);
    try {
      await signUp2(data);
      alert('회원가입이 완료되었습니다. 홈 페이지로 이동합니다');
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Container>
      <SubTitle>1분이면 끝나요</SubTitle>
      <Title>
        피클 타임과
        <br /> 함께 스터디해요!
      </Title>
      <Form onSubmit={handleSubmit(handleSignUp2)}>
        <FormField>
          <Label>뭐라고 부를까요?</Label>
          <InputContainer $isError={!!errors.nickname}>
            <InputLabel>닉네임(필수)</InputLabel>
            <InputField
              type="text"
              placeholder="8자 이내 닉네임 입력"
              {...register('nickname', {
                required: true,
                maxLength: {
                  value: 8,
                  message: '8자 이하로 입력하세요',
                },
                minLength: {
                  value: 2,
                  message: '2자 이상 입력하세요',
                },
              })}
            />
            <InputButton src="/icons/clear.svg" alt="clear" onClick={() => setValue('nickname', '')} />
          </InputContainer>
          {errors.nickname?.message && <ErrorMessage>{errors.nickname.message?.toString()}</ErrorMessage>}
        </FormField>
        <span>TODO: 프로필 사진 업로드</span>
        <FormField>
          <Label>주로 어디에서 활동하세요?</Label>
          <InputContainer $isError={!!errors.area}>
            <InputLabel>지역(선택)</InputLabel>
            <InputField type="text" {...register('area', { required: false })} />
          </InputContainer>
          {/* {errors.area && <ErrorMessage>{errors.area.message?.toString()}</ErrorMessage>} */}
        </FormField>

        <FormField>
          <Label>매주 출근하시나요? (삭제예정)</Label>
          <InputContainer $isError={!!errors.company}>
            <InputLabel>회사명(선택)</InputLabel>
            <InputField
              type="text"
              placeholder="다니고 계신 회사명을 알려 주세요"
              {...register('company', { required: false })}
            />
          </InputContainer>
          {/* {errors.company && <ErrorMessage>{errors.company.message?.toString()}</ErrorMessage>} */}
        </FormField>
        <FinishButton type="submit" disabled={!isValid || isSubmitting}>
          회원가입 완료하기
        </FinishButton>
      </Form>
    </Container>
  );
}
