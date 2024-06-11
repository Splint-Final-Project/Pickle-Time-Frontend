import DatePicker from '@/components/datePicker/DatePicker';
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

export default function CreatePickle2() {
  const {
    deadLine,
    when,
    category,
    setDeadLine,
    setWhen,
    setCategory,
  } = usePickleCreation();
  const navigate = useNavigate();

  return (
    <Container>
      <TitleContainer>
        <Title>
          <img src="icons/back.svg" alt="back" onClick={() => navigate('/pickle-create-1')} />
          <div>피클 생성</div>
        </Title>
        <StepIndicatorContainer>
          <StepIndicator $selected={false}>1</StepIndicator>
          <StepIndicator $selected={true}>2</StepIndicator>
          <StepIndicator $selected={false}>3</StepIndicator>
          <StepIndicator $selected={false}>4</StepIndicator>
        </StepIndicatorContainer>
      </TitleContainer>

      <InputComponent>
        <label htmlFor="category">카테고리:</label>
        <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} />
      </InputComponent>
      <InputComponent>
        <label htmlFor="when">When:</label>
        {/* <input type="text" id="when" value={when} onChange={e => setWhen(e.target.value)} /> */}
      </InputComponent>
      <InputComponent>
        <label htmlFor="cost">Cost:</label>
        {/* <input type="text" id="cost" value={cost} onChange={e => setCost(e.target.value)} /> */}
      </InputComponent>
      <SubmitButton onClick={() => navigate('/pickle-create-3')}>다음 단계로 넘어가기</SubmitButton>
    </Container>
  );
}
