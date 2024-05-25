import { useState } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController, useForm } from 'react-hook-form';
import Label from './Label';
import Input from './Input';
import ErrorMessage from './ErrorMessage';

interface PasswordInput {
  id: string;
  label: string;
  placeholder: string;
}

export default function PasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ id, label, placeholder, ...restProps }: PasswordInput & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value = '', onChange },
    fieldState: { error },
  } = useController(restProps);
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleIsShowState = () => {
    setIsShow(prev => !prev);
  };
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div>
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
      </div>
      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  );
}
