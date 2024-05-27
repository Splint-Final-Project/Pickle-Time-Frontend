import React, { useEffect, useRef, useState } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController, useForm } from 'react-hook-form';
import Label from './Label';
import Input from './Input';
import ErrorMessage from './ErrorMessage';

interface FormFieldProps {
  children: React.ReactNode;
  handleSubmit: any;
  onSubmit: (data: any) => void;
}

interface InputFieldProps {
  id: string;
  labelText: string;
  placeholder: string;
  focus?: boolean;
}

interface PasswordInput {
  id: string;
  labelText: string;
  placeholder: string;
}

interface CheckboxInputProps extends Omit<PasswordInput, 'placeholder'> {}
//TODO : 스타일 컴포넌트로 만들기

function FormField({ children, handleSubmit, onSubmit }: FormFieldProps) {
  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
}

function InputField<
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

function PasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ id, labelText, placeholder, ...controllerProps }: PasswordInput & UseControllerProps<TFieldValues, TName>) {
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

function CheckboxInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ id, labelText, ...controllerProps }: CheckboxInputProps & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value, onChange },
  } = useController(controllerProps);
  return (
    <div>
      <Input type="checkbox" id={id} value={value} onChange={onChange} />
      <Label htmlFor={id}>{labelText}</Label>
    </div>
  );
}
const Form = Object.assign(FormField, {
  textInput: InputField,
  passwordInput: PasswordInput,
  CheckboxInput,
});

export default Form;

// 사용예시
// export default function SigninPage() {
//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       userId: '',
//       password: '',
//       isshow: false,
//     },
//   });

//   const handleOnSubmit = (data: any) => {
//     console.log(data);
//   };

//   return (
//     <div>
//       <Form handleSubmit={handleSubmit} onSubmit={handleOnSubmit}>
//         <Form.textInput
//           id="userId"
//           labelText="아이디"
//           placeholder="아이디를 입력해주세요"
//           name="userId"
//           control={control}
//         />
//         <Form.passwordInput
//           id="password"
//           placeholder="비밀번호를 입력해주세요"
//           labelText="비밀번호"
//           name="password"
//           control={control}
//         />
//         <Form.CheckboxInput id="checkbox" labelText="할루?" name="isshow" control={control} />
//         <button type="submit">제출</button>
//       </Form>
//     </div>
//   );
// }
