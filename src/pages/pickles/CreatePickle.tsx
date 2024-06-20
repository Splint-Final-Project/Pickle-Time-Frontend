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
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import ConfirmationModal from '@/components/common/modal/ConfirmationModal';

export default function CreatePickle() {
  const {
    step,
    setStep,
    title,
    capacity,
    category,
    clear,
    inProgress,
    setInProgress,
    imgUrl,
    explanation,
    goals,
    cost,
    isImgLoading,
    place,
    address,
    detailedAddress,
    areaCode,
    when,
  } = usePickleCreation();

  const navigate = useNavigate();
  const { handleOpen } = useBottomSheetModal(state => state);

  return (
    <Container>
      <TitleContainer>
        <Title>
          <img
            src="/icons/back.svg"
            alt="back"
            onClick={() => {
              if (step === 1) {
                if (inProgress) {
                  handleOpen({
                    renderComponent: ConfirmationModal,
                    nocallback: () => {},
                    yescallback: () => navigate('/', { replace: true }),
                    message: '작성중이던 피클은 임시 저장됩니다.',
                    yesText: '확인',
                    noText: '취소',
                  });
                } else {
                  clear();
                  navigate('/', { replace: true });
                }
              } else {
                setStep((step - 1) as 1 | 2 | 3 | 4);
              }
            }}
          />
          <div>피클 생성</div>
        </Title>
        <StepIndicatorContainer>
          <StepIndicator $selected={step === 1}>1</StepIndicator>
          <StepIndicator $selected={step === 2}>2</StepIndicator>
          <StepIndicator $selected={step === 3}>3</StepIndicator>
          <StepIndicator $selected={step === 4}>4</StepIndicator>
        </StepIndicatorContainer>
      </TitleContainer>

      {(() => {
        switch (step) {
          case 1:
            return (
              <>
                <InputComponent>
                  <TitleInput hook={usePickleCreation} />
                </InputComponent>
                <InputComponent>
                  <CategorySelect hook={usePickleCreation} />
                </InputComponent>
                <InputComponent>
                  <CapacitySelect hook={usePickleCreation} />
                </InputComponent>
                <SubmitButton
                  disabled={capacity === 0 || category === '' || title === ''}
                  onClick={() => {
                    setInProgress(true);
                    setStep(2);
                  }}
                >
                  다음 단계로 이동하기
                </SubmitButton>
              </>
            );
          case 2:
            return (
              <>
                <InputComponent>
                  <ImgSelect hook={usePickleCreation} />
                </InputComponent>
                <InputComponent>
                  <WriteDetail hook={usePickleCreation} />
                </InputComponent>
                <InputComponent>
                  <GoalSelect hook={usePickleCreation} />
                </InputComponent>
                <InputComponent>
                  <CostSelect hook={usePickleCreation} />
                </InputComponent>
                <SubmitButton
                  disabled={!imgUrl || !explanation || goals.length === 0 || !cost || isImgLoading}
                  onClick={() => {
                    setInProgress(true);
                    setStep(3);
                  }}
                >
                  다음 단계로 이동하기
                </SubmitButton>
              </>
            );
          case 3:
            return (
              <>
                <InputComponent>
                  <AreaInput hook={usePickleCreation} />
                </InputComponent>
                <InputComponent>
                  <DateSelect hook={usePickleCreation} />
                </InputComponent>
                <SubmitButton
                  disabled={!place || !address || !areaCode || when.times.length === 0}
                  onClick={() => {
                    setInProgress(true);
                    setStep(4);
                  }}
                >
                  다음 단계로 이동하기
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
