import { useNavigate } from 'react-router-dom';
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
import { useDateSelect } from '@/hooks/zustand/useDateSelect';
import CostSelect from '@/components/pickleCreate/CostSelect';
import ImgSelect from '@/components/pickleCreate/ImgSelect';
import WriteDetail from '@/components/pickleCreate/WriteDetail';
import GoalSelect from '@/components/pickleCreate/GoalSelect';
export default function CreatePickle2() {
  const { imgUrl, explanation, goals, cost, isImgLoading } = usePickleCreation();
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

      {/* 대표 이미지 */}
      <InputComponent>
        <ImgSelect />
      </InputComponent>

      {/* 상세 설명 */}
      <InputComponent>
        <WriteDetail />
      </InputComponent>

      {/* 목표 설정 */}
      <InputComponent>
        <GoalSelect />
      </InputComponent>

      {/* 비용 선택 */}
      <InputComponent>
        <CostSelect />
      </InputComponent>
      <SubmitButton
        disabled={!imgUrl || !explanation || goals.length === 0 || !cost || isImgLoading}
        onClick={() => navigate('/pickle-create-3')}
      >
        다음 단계로 넘어가기
      </SubmitButton>
    </Container>
  );
}
