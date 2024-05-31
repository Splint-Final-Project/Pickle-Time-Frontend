import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';
import Input from './Input';
import { PasswordInputProps } from './PasswordInput';
import styled from '@emotion/styled';

interface CheckboxInputProps extends Omit<PasswordInputProps, 'placeholder'> {}

export default function CheckboxInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ id, labelText, ...controllerProps }: CheckboxInputProps & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value, onChange },
  } = useController(controllerProps);
  return (
    <Styled.CheckboxWrapper>
      <Input type="checkbox" id={id} value={value} onChange={onChange} />
      <label htmlFor={id}>{labelText}</label>
    </Styled.CheckboxWrapper>
  );
}
//TODO : 스타일링 추가 및 변경
const Styled = {
  CheckboxWrapper: styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  `,
};
