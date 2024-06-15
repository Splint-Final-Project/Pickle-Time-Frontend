import { useNavigate } from 'react-router-dom';

import DateSelect from '@/components/inCreatePickleTwo/dateSelect/DateSelect';
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
import CategorySelect from '@/components/inCreatePickleTwo/categorySelect/CategorySelect';
import { deadlineCalculate, totalMeetingTimesCalculate } from '@/utils/dateCalculate';
// import { picklesRequests } from '@/apis/pickle.api';
import { useDateSelect } from '@/hooks/zustand/useDateSelect';
export default function CreatePickle2() {
  const { cost, category, deadLine, when, setDeadLine, setWhen } = usePickleCreation();
  const { startDate, finishDate, selectedDays, startTime, finishTime } = useDateSelect();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // if (!category) {
      //   throw new Error('피클 타임의 카테고리를 선택해 주세요.');
      // }

      // if (!cost) {
      //   throw new Error('피클 타임 비용을 입력해 주세요.');
      // }

      // deadline
      const newDeadLine = deadlineCalculate();
      setDeadLine(newDeadLine);

      // when
      const { times, summary } = await totalMeetingTimesCalculate({
        startDate,
        finishDate,
        selectedDays,
        startTime,
        finishTime,
        deadline: newDeadLine,
      });
      setWhen({ times: times, summary: summary });

      // navigate
      navigate('/pickle-create-3');
    } catch (error) {
      console.log(error);
    }
  };

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

      {/* 카테고리 선택 */}
      <InputComponent>
        <CategorySelect />
      </InputComponent>

      {/* 날짜 선택 */}

      <InputComponent>
        <DateSelect />
      </InputComponent>

      {/* 비용 선택 */}
      <InputComponent>
        <CostSelect />
      </InputComponent>
      <SubmitButton onClick={handleClick}>다음 단계로 넘어가기</SubmitButton>
    </Container>
  );
}
