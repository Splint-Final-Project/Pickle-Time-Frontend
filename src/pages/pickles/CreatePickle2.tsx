import { useNavigate } from 'react-router-dom';

import DatePicker from '@/components/inCreatePickleTwo/datePicker/DatePicker';
import CostSelect from '@/components/inCreatePickleTwo/costSelect/CostSelect';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
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
        {/* 카테고리 선택 */}
        <InputComponent>

        </InputComponent>
      </TitleContainer>
      {/* 날짜 선택 */}
      <InputComponent>
        <DatePicker/>
      </InputComponent>
      {/* 비용 선택 */}
      <InputComponent>
        <CostSelect/>
      </InputComponent>
      <SubmitButton onClick={() => navigate('/pickle-create-3')}>다음 단계로 넘어가기</SubmitButton>
    </Container>
  );
}
