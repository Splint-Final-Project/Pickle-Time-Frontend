import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import Input from './Input';
import ErrorMessage from './ErrorMessage';
import Label from './Label';

//TODO : 스타일링 추가
interface InputFieldProps {
  id: string;
  labelText: string;
  placeholder: string;
  focus?: boolean;
}

/**
 * @InputField필수Props id, labelText(라벨 텍스트), placeholder(input placeholder), name(react-hook-form과 연결할 이름), control(useForm함수가 리턴하는 control을 넘겨주세요)
 * @InputField선택Props focus(focus만 넘기면 mount될 때 바로 focus), rules(검증할 패턴이 많다면 패턴을 객체로 만들어서 넘겨주세요)
 * @
 */

export default function InputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  labelText,
  placeholder,
  focus,
  ...controllerProps
}: InputFieldProps & UseControllerProps<TFieldValues, TName>) {
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
      <Label htmlFor={id}>{labelText}</Label>
      <Input type="text" id={id} value={value} onChange={onChange} placeholder={placeholder} ref={inputRef} />
      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  );
}
