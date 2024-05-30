import styled from '@emotion/styled';
import Label from './Label';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

interface TextareaFieldProps {
  labelText: string;
}

export default function TextareaField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ labelText, ...controllerProps }: TextareaFieldProps & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController(controllerProps);
  return (
    <Styled.TextareaFieldWrapper>
      <Label htmlFor="textarea">{labelText}</Label>
      <Styled.Textarea id="textarea" onChange={onChange} />
    </Styled.TextareaFieldWrapper>
  );
}
//TODO : 스타일링 추가 및 변경
const Styled = {
  TextareaFieldWrapper: styled.div``,
  Textarea: styled.textarea`
    resize: none;
    width: 100%;
    height: 200px;
  `,
};
