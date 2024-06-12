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
import { picklesRequests } from '@/apis/pickle.api';
import { useDateSelect } from '@/hooks/zustand/useDateSelect';

export default function CreatePickle2() {
  const {
    deadLine,
    when,
    setDeadLine,
    setWhen,
  } = usePickleCreation();
  const navigate = useNavigate();
  const { 
    startDate,
    finishDate,
    weekend,
    startTime,
    finishTime 
  } = useDateSelect();
  
  const handleClick = async () => {
    try {
      // deadline
      const newDeadLine = deadlineCalculate();
      setDeadLine(newDeadLine);

      // when
      const { times, summary } = await totalMeetingTimesCalculate({ 
        startDate, 
        finishDate,
        weekend,
        startTime,
        finishTime,
        deadline: newDeadLine
      });
      setWhen({ times: times, summary: summary });
      console.log(when)
    } catch (error) {
      console.log(error);
    }
  }

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
        <CategorySelect/>
      </TitleContainer>
      {/* 날짜 선택 */}
      <InputComponent>
        <DateSelect/>
      </InputComponent>
      {/* 비용 선택 */}
      <InputComponent>
        <CostSelect/>
      </InputComponent>
      <button onClick={handleClick}>hi</button>
      <SubmitButton onClick={() => navigate('/pickle-create-3')}>다음 단계로 넘어가기</SubmitButton>
    </Container>
  );
}
