import { useState } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';
import Label from './Label';
import Input from './Input';
import ErrorMessage from './ErrorMessage';
import styled from '@emotion/styled';

export interface PasswordInputProps {
  id: string;
  labelText: string;
  placeholder: string;
}

export default function PasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ id, labelText, placeholder, ...controllerProps }: PasswordInputProps & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value = '', onChange },
    fieldState: { error },
  } = useController(controllerProps);
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleIsShowState = () => {
    setIsShow(prev => !prev);
  };
  return (
    <Styled.PasswordInputWrapper>
      <Label htmlFor={id}>{labelText}</Label>
      <Styled.PasswordInputInner>
        <Input
          id={id}
          type={!isShow ? 'password' : 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button type="button" onClick={handleIsShowState}>
          비번오픈
        </button>
      </Styled.PasswordInputInner>
      <ErrorMessage>{error?.message}</ErrorMessage>
    </Styled.PasswordInputWrapper>
  );
}
//TODO : 스타일링 추가 및 변경
const Styled = {
  PasswordInputWrapper: styled.div``,
  PasswordInputInner: styled.div``,
};
