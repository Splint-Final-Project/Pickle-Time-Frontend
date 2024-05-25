import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import Input from './Input';
import ErrorMessage from './ErrorMessage';
import Label from './Label';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  focus?: boolean;
}

export function InputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ id, label, placeholder, focus, ...controllerProps }: InputFieldProps & UseControllerProps<TFieldValues, TName>) {
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
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input type="text" id={id} value={value} onChange={onChange} placeholder={placeholder} ref={inputRef} />
      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  );
}
