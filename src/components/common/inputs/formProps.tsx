import React from 'react';
import ScoreInput from './ScoreInput';
import DropdownInput from './DropdownInput';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import CheckboxInput from './CheckboxInput';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import TextareaField from './TextareaField';

interface FormFieldProps {
  children: React.ReactNode;
  handleSubmit: any;
  onSubmit: (data: any) => void;
}

function FormField({ children, handleSubmit, onSubmit }: FormFieldProps) {
  return <Styled.Form onSubmit={handleSubmit(onSubmit)}>{children}</Styled.Form>;
}
//TODO : 스타일링 추가 및 변경
const Styled = {
  Form: styled.form``,
};

const Form = Object.assign(FormField, {
  TextInput,
  PasswordInput,
  CheckboxInput,
  DropdownInput,
  ScoreInput,
  TextareaField,
});

// 사용예시
const RENDERLIST = [
  {
    id: 1,
    value: 1,
    viewValue: 1,
  },
  {
    id: 2,
    value: 2,
    viewValue: 2,
  },
  {
    id: 3,
    value: 3,
    viewValue: 3,
  },
  {
    id: 4,
    value: 4,
    viewValue: 4,
  },
  {
    id: 5,
    value: 5,
    viewValue: 5,
  },
  {
    id: 6,
    value: 6,
    viewValue: 6,
  },
];

export default function SigninPage() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      userId: '',
      password: '',
      isshow: false,
      dropdown: '',
      score: '0',
      review: '',
    },
  });

  const handleOnSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <Form handleSubmit={handleSubmit} onSubmit={handleOnSubmit}>
        <Form.TextInput
          id="userId"
          labelText="아이디"
          placeholder="아이디를 입력해주세요"
          name="userId"
          control={control}
        />
        <Form.PasswordInput
          id="password"
          placeholder="비밀번호를 입력해주세요"
          labelText="비밀번호"
          name="password"
          control={control}
        />
        <Form.CheckboxInput id="checkbox" labelText="할루?" name="isshow" control={control} />
        <Form.DropdownInput name="dropdown" defaultValue="1" control={control} renderList={RENDERLIST} />
        <Form.ScoreInput name="score" control={control} />
        <Form.TextareaField labelText="하이" name="review" control={control} />
        <button type="submit">제출</button>
      </Form>
    </div>
  );
}
