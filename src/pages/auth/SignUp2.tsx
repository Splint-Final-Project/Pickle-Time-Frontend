import { authRequests } from '@/apis/auth.api';
import { SignUpFormValues2 } from '@/apis/types/auth.type';
import useAuth from '@/hooks/zustand/useAuth';
import { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
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
  AreaSelector,
  SiSelector,
  SiElement,
  GuSelector,
  GuElement,
  SelectedGus,
  SelectedGu,
} from './SignUpStyled';
import { sis, sigus, map } from '@/constants/areas';
import toast from 'react-hot-toast';

export type SigusType = {
  [key: string]: { si: string; gu: string; code: number }[];
};

export default function SignUp2() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid, errors },
  } = useForm<SignUpFormValues2>({ mode: 'onBlur' });

  const [selectedSi, setSelectedSi] = useState<string>('seoul');
  const [selectedGus, setSelectedGus] = useState<Set<number>>(new Set());

  const navigate = useNavigate();
  const { user, signUp2 } = useAuth();

  async function handleSignUp2(data: SignUpFormValues2) {
    try {
      await signUp2(data);
      toast.success('회원가입이 완료되었습니다. 홈 화면으로 이동합니다.');
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }

  function handleClickGu(code: number) {
    setSelectedGus(prev => {
      if (prev.has(code)) {
        prev.delete(code);
      } else {
        prev.add(code);
      }
      console.log(prev);
      return new Set(prev);
    });
  }

  useEffect(() => {
    setValue('areaCodes', Array.from(selectedGus));
  }, [selectedGus]);

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
        <FormField>
          <Label>
            주로 어디에서 활동하세요? <span>중복 선택 가능</span>
          </Label>
          <AreaSelector>
            <SiSelector>
              {sis.map(si => (
                <SiElement
                  key={si.value}
                  $selected={si.value === selectedSi}
                  data-value={si.value}
                  onClick={() => setSelectedSi(si.value)}
                >
                  {si.label}
                </SiElement>
              ))}
            </SiSelector>
            <GuSelector>
              {(sigus as SigusType)[selectedSi].map(gu => (
                <GuElement
                  key={gu.gu + (selectedGus.has(gu.code) ? '1' : '0')}
                  $selected={selectedGus.has(gu.code)}
                  onClick={() => handleClickGu(gu.code)}
                >
                  {gu.gu}
                </GuElement>
              ))}
            </GuSelector>
          </AreaSelector>
          <SelectedGus>
            {Array.from(selectedGus).map(code => {
              const item = map.get(code);
              return (
                <SelectedGu key={code}>
                  {item.si + ' ' + item.gu}
                  <img src="/icons/x.svg" alt="x" onClick={() => handleClickGu(code)}></img>
                </SelectedGu>
              );
            })}
          </SelectedGus>
        </FormField>

        <FinishButton type="submit" disabled={!isValid || isSubmitting}>
          회원가입 완료하기
        </FinishButton>
      </Form>
    </Container>
  );
}
