import { FieldPath, FieldValues, UseControllerProps, useController, useForm } from 'react-hook-form';
import PasswordInput from './PasswordInput';
import { useEffect, useRef } from 'react';

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  focus?: boolean;
}

export function Input<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ id, label, placeholder, focus, ...controllerProps }: InputProps & UseControllerProps<TFieldValues, TName>) {
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
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} value={value} onChange={onChange} placeholder={placeholder} ref={inputRef} />
      <p>{error?.message}</p>
    </div>
  );
}

// type TUserInput = {
//   userId: string;
//   password: string;
// };

// export default function Form() {
//   const { control, handleSubmit } = useForm<TUserInput>({
//     defaultValues: {
//       userId: '',
//     },
//     mode: 'onChange',
//   });
//   const onSubmit = data => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Input
//         name="userId"
//         control={control}
//         rules={{
//           required: '아이디를 입력해주세요',
//           pattern: {
//             value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
//             message: '이메일 형식을 지켜주세요',
//           },
//         }}
//         placeholder="아이디 입력좀"
//         id="userId"
//         label="아이디"
//         focus
//       />
//       <PasswordInput name="password" control={control} id="password" label="비번입력" placeholder="비번입력좀" />

//       <button type="submit">제출</button>
//     </form>
//   );
// }
