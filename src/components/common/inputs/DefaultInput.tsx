import { useEffect, useRef, useState } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import styled from '@emotion/styled';
import DeleteInputValueIcon from '@/assets/icons/DeleteInputValueIcon';
import PasswordShowIcon from '@/assets/icons/PasswordShowIcon';

interface TextInputProps {
  id: string;
  labelText: string;
  placeholder: string;
  focus?: boolean;
  type: 'text' | 'email';
}

function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  labelText,
  placeholder,
  focus,
  type,
  ...controllerProps
}: TextInputProps & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController(controllerProps);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleDeleteValueIcon = () => {
    onChange('');
  };

  return (
    <div>
      <S.InputWrapper $invalid={error?.message}>
        <S.Label htmlFor={id}>{labelText}</S.Label>
        <S.Input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={inputRef}
        ></S.Input>
        <S.InputValueHandleBtn type="button" onClick={handleDeleteValueIcon} $isShow={!!value}>
          <DeleteInputValueIcon />
        </S.InputValueHandleBtn>
      </S.InputWrapper>
      <S.ErrorMessageBox>{error?.message}</S.ErrorMessageBox>
    </div>
  );
}

function PasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  labelText,
  placeholder,
  ...controllerProps
}: Omit<TextInputProps, 'focus' | 'type'> & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value = '', onChange },
    fieldState: { error },
  } = useController(controllerProps);
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleIsShowState = () => {
    setIsShow(prev => !prev);
  };
  return (
    <div>
      <S.InputWrapper $invalid={error?.message}>
        <S.Label htmlFor={id}>{labelText}</S.Label>
        <S.Input
          id={id}
          type={!isShow ? 'password' : 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <S.InputValueHandleBtn type="button" onClick={handleIsShowState} $isShow={!!value}>
          <PasswordShowIcon />
        </S.InputValueHandleBtn>
      </S.InputWrapper>
      <S.ErrorMessageBox>{error?.message}</S.ErrorMessageBox>
    </div>
  );
}

const S = {
  InputWrapper: styled.div<{ $invalid?: string }>`
    padding: 0.4rem 1.2rem 0.8rem;
    background: #f7f9f7;
    border-radius: 0.8rem;
    border: 1px solid ${({ $invalid }) => ($invalid ? '#D54040' : 'transparent')};
    width: 100%;
    position: relative;
    &:focus-within {
      border: 1px solid #888d88;
    }
  `,
  Input: styled.input`
    border: none;
    background: transparent;
    width: 100%;
    outline: none;
    &::placeholder {
      color: #aeaeae;
      font-size: 1.4rem;
    }
  `,
  ErrorMessageBox: styled.p`
    font-size: 1.2rem;
    color: #d54040;
    min-height: 1.2rem;
    min-width: 1px;
    margin-top: 8px;
  `,
  InputValueHandleBtn: styled.button<{ $isShow: boolean }>`
    position: absolute;
    bottom: 1.2rem;
    right: 1.2rem;
    display: ${({ $isShow }) => ($isShow ? 'inline-block' : 'none')};
  `,
  Label: styled.label`
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
    color: #737373;
  `,
};

const Form = {
  TextInput,
  PasswordInput,
};

export default Form;
