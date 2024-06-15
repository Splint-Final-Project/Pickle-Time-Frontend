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
import AreaInput from '@/components/pickleCreate/AreaInput';
import DateSelect from '@/components/pickleCreate/dateSelect/DateSelect';
export default function CreatePickle3() {
  const { place, address, detailedAddress, areaCode, when } = usePickleCreation();
  const navigate = useNavigate();

  return (
    <Container>
      <TitleContainer>
        <Title>
          <img src="icons/back.svg" alt="back" onClick={() => navigate('/pickle-create-2')} />
          <div>피클 생성</div>
        </Title>
        <StepIndicatorContainer>
          <StepIndicator $selected={false}>1</StepIndicator>
          <StepIndicator $selected={false}>2</StepIndicator>
          <StepIndicator $selected={true}>3</StepIndicator>
          <StepIndicator $selected={false}>4</StepIndicator>
        </StepIndicatorContainer>
      </TitleContainer>

      <InputComponent>
        <AreaInput />
      </InputComponent>

      <InputComponent>
        <DateSelect />
      </InputComponent>

      <SubmitButton
        disabled={!place || !address || !detailedAddress || !areaCode || when.times.length === 0}
        onClick={() => navigate('/pickle-create-4')}
      >
        다음 단계로 넘어가기
      </SubmitButton>
    </Container>
  );
}
