import { useState } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController, useForm } from 'react-hook-form';

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
      <label htmlFor={id}>{label}</label>
      <div>
        <input
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
      <p>{error?.message}</p>
    </div>
  );
}
