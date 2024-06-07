import { useForm } from 'react-hook-form';
import Form from './DefaultInput';

//사용예시

/**
 * @FormTextInput
 * @필수옵션
 * id(라벨과 연결됨)
 * labelText(라벨에 들어갈 텍스트)
 *  placeholder(inputplaceholder)
 * type(input 타입 email | text)
 * contorol(useForm이 리턴하는 control넣어주기)
 * name(제출했을 때 데이터 이름)
 * @선택옵션
 * rules(유효성 패턴)
 * focus(이 옵션을 주면 마운트시 바로 이 input에 focus가 됩니다)
 * 그리고 나머지는 UseControllerProps옵션입니다.
 *
 * @FormPasswordInput
 * @필수옵션
 * id(라벨과 연결됨)
 * labelText(라벨에 들어갈 텍스트)
 * placeholder(inputplaceholder)
 * contorol(useForm이 리턴하는 control넣어주기)
 * name(제출했을 때 사용할 데이터 이름)
 * @선택옵션
 * rules(유효성 패턴)
 * 그리고 나머지는 UseControllerProps옵션입니다.
 *
 *
 **/
export default function SigninPage() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleOnSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div style={{ width: '40vw', margin: 'auto' }}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Form.TextInput
          id="userEmail"
          labelText="이메일"
          type="email"
          name="email"
          control={control}
          placeholder="이메일을 입력해주세요"
          rules={{ required: ' 이메일을 입력해주세요' }}
        />
        <Form.PasswordInput
          id="userPassword"
          labelText="비밀번호"
          name="password"
          control={control}
          placeholder="비밀번호를 입력해주세요"
        />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
