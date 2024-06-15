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
import CostSelect from '@/components/pickleCreate/CostSelect';
import ImgSelect from '@/components/pickleCreate/ImgSelect';
import WriteDetail from '@/components/pickleCreate/WriteDetail';
import GoalSelect from '@/components/pickleCreate/GoalSelect';
import AreaInput from '@/components/pickleCreate/AreaInput';
import DateSelect from '@/components/pickleCreate/dateSelect/DateSelect';
import CreationPayment from '@/components/pickleCreate/CreationPayment';

export default function CreatePickle() {
  const { step, setStep, title, capacity, category } = usePickleCreation();
  const { imgUrl, explanation, goals, cost, isImgLoading } = usePickleCreation();
  const { place, address, detailedAddress, areaCode, when } = usePickleCreation();
  const navigate = useNavigate();

  return (
    <Container>
      <TitleContainer>
        <Title>
          <img
            src="icons/back.svg"
            alt="back"
            onClick={() => {
              if (step === 1 || step === 0) {
                navigate('/');
              } else {
                setStep((step - 1) as 1 | 2 | 3 | 4);
              }
            }}
          />
          <div>피클 생성</div>
        </Title>
        <StepIndicatorContainer>
          <StepIndicator $selected={step === 1 || step === 0}>1</StepIndicator>
          <StepIndicator $selected={step === 2}>2</StepIndicator>
          <StepIndicator $selected={step === 3}>3</StepIndicator>
          <StepIndicator $selected={step === 4}>4</StepIndicator>
        </StepIndicatorContainer>
      </TitleContainer>

      {(() => {
        switch (step) {
          case 0:
          case 1:
            return (
              <>
                <InputComponent>
                  <TitleInput />
                </InputComponent>
                <InputComponent>
                  <CategorySelect />
                </InputComponent>
                <InputComponent>
                  <CapacitySelect />
                </InputComponent>
                <SubmitButton
                  disabled={capacity === 0 || category === '' || title === ''}
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  다음 단계로 넘어가기
                </SubmitButton>
              </>
            );
          case 2:
            return (
              <>
                <InputComponent>
                  <ImgSelect />
                </InputComponent>
                <InputComponent>
                  <WriteDetail />
                </InputComponent>
                <InputComponent>
                  <GoalSelect />
                </InputComponent>
                <InputComponent>
                  <CostSelect />
                </InputComponent>
                <SubmitButton
                  disabled={!imgUrl || !explanation || goals.length === 0 || !cost || isImgLoading}
                  onClick={() => {
                    setStep(3);
                  }}
                >
                  다음 단계로 넘어가기
                </SubmitButton>
              </>
            );
          case 3:
            return (
              <>
                <InputComponent>
                  <AreaInput />
                </InputComponent>
                <InputComponent>
                  <DateSelect />
                </InputComponent>
                <SubmitButton
                  disabled={!place || !address || !detailedAddress || !areaCode || when.times.length === 0}
                  onClick={() => {
                    setStep(4);
                  }}
                >
                  다음 단계로 넘어가기
                </SubmitButton>
              </>
            );
          case 4:
            return (
              <>
                <CreationPayment />
              </>
            );
          default:
            return <div>잘못된 접근입니다.</div>;
        }
      })()}
    </Container>
  );
}
