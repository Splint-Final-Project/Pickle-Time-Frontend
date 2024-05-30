import { useState } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController, useForm } from 'react-hook-form';
import Label from './Label';
import Input from './Input';
import ErrorMessage from './ErrorMessage';

//TODO : 스타일링 추가 및 구조 변경
interface PasswordInput {
  id: string;
  labelText: string;
  placeholder: string;
}
/**
 * @PasswordInput필수Props id, label(라벨 텍스트), placeholder(input placeholder), name(react-hook-form과 연결할 이름), control(useForm함수가 리턴하는 control을 넘겨주세요)
 * @PasswordInput선택Props rules(검증할 패턴이 많다면 패턴을 객체로 만들어서 넘겨주세요)
 
 */

export default function PasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ id, labelText, placeholder, ...restProps }: PasswordInput & UseControllerProps<TFieldValues, TName>) {
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
      <Label htmlFor={id}>{labelText}</Label>
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
