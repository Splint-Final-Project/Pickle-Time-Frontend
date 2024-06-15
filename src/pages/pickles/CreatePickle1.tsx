import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  InputComponent,
  StepIndicator,
  StepIndicatorContainer,
  SubmitButton,
  Title,
  TitleContainer,
} from './CreatePickleStyled';
import CategorySelect from '@/components/pickleCreate/CategorySelect';
import CapacitySelect from '@/components/pickleCreate/CapacitySelect';
import TitleInput from '@/components/pickleCreate/TitleInput';

export default function CreatePickle1() {
  const { title, capacity, category } = usePickleCreation();
  const navigate = useNavigate();

  return (
    <Container>
      <TitleContainer>
        <Title>
          <img src="icons/back.svg" alt="back" onClick={() => navigate('/')} />
          <div>피클 생성</div>
        </Title>
        <StepIndicatorContainer>
          <StepIndicator $selected={true}>1</StepIndicator>
          <StepIndicator $selected={false}>2</StepIndicator>
          <StepIndicator $selected={false}>3</StepIndicator>
          <StepIndicator $selected={false}>4</StepIndicator>
        </StepIndicatorContainer>
      </TitleContainer>

      {/*제목*/}
      <InputComponent>
        <TitleInput />
      </InputComponent>

      {/*카테고리*/}
      <InputComponent>
        <CategorySelect />
      </InputComponent>

      {/*인원 수*/}
      <InputComponent>
        <CapacitySelect />
      </InputComponent>

      <SubmitButton
        disabled={capacity === 0 || category === '' || title === ''}
        onClick={() => navigate('/pickle-create-2')}
      >
        다음 단계로 넘어가기
      </SubmitButton>
    </Container>
  );
}
