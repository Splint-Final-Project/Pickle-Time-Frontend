import { InputConstraint, InputField, LabelText } from './CreatePicklePageStyled';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';

export default function TitleInput() {
  const { title, setTitle } = usePickleCreation();
  return (
    <>
      <LabelText htmlFor="title">피클의 이름을 설정해 주세요</LabelText>
      <InputField
        type="text"
        id="title"
        placeholder="모임 이름을 입력해 주세요"
        style={{
          fontSize: '20px',
          fontWeight: '600',
        }}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <InputConstraint>20자 이내로 입력해 주세요</InputConstraint>
    </>
  );
}
