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
import CapacitySelect from '@/components/inCreatePickleThree/capacitySelect/CapacitySelect';
import WriteDetail from '@/components/inCreatePickleThree/writeDetail/WriteDetail';
import GoalSelect from '@/components/inCreatePickleThree/goalSelect/GoalSelect';
import ImgSelect from '@/components/inCreatePickleThree/imgSelect/ImgSelect';

export default function CreatePickle3() {
  const { capacity, explanation, goals } = usePickleCreation();
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

      {/* 대표 이미지 */}
      <InputComponent>
        <ImgSelect />
      </InputComponent>

      {/* 상세 설명 */}
      <InputComponent>
        <WriteDetail />
      </InputComponent>

      {/* 참여 인원 */}
      <InputComponent>
        <CapacitySelect />
      </InputComponent>

      {/* 목표 설정 */}
      <InputComponent>
        <GoalSelect />
      </InputComponent>

      <SubmitButton onClick={() => navigate('/pickle-create-4')}>다음 단계로 넘어가기</SubmitButton>
    </Container>
  );
}
