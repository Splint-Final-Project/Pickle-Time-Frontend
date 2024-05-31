import { useEffect, useRef } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';
import Label from './Label';
import Input from './Input';
import ErrorMessage from './ErrorMessage';
import styled from '@emotion/styled';
interface TextInputProps {
  id: string;
  labelText: string;
  placeholder: string;
  focus?: boolean;
}

export default function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ id, labelText, placeholder, focus, ...controllerProps }: TextInputProps & UseControllerProps<TFieldValues, TName>) {
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

  return (
    <Styled.TextInputWrapper>
      <Label htmlFor={id}>{labelText}</Label>
      <Input type="text" id={id} value={value} onChange={onChange} placeholder={placeholder} ref={inputRef} />
      <ErrorMessage>{error?.message}</ErrorMessage>
    </Styled.TextInputWrapper>
  );
}
//TODO : 스타일링 추가 및 변경
const Styled = {
  TextInputWrapper: styled.div``,
};
