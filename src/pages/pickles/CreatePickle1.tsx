import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import React from 'react';
import axios from 'axios';
import client from '@/apis/axios';
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

export default function CreatePickle1() {
  const {
    title,
    capacity,
    cost,
    deadLine,
    where,
    when,
    category,
    explanation,
    viewCount,
    latitude,
    longitude,
    setTitle,
    setCapacity,
    setCost,
    setDeadLine,
    setWhere,
    setWhen,
    setCategory,
    setExplanation,
    setViewCount,
    setLatitude,
    setLongitude,
  } = usePickleCreation();
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

      <InputComponent>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
      </InputComponent>
      <InputComponent>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
      </InputComponent>
      <InputComponent>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
      </InputComponent>
      <SubmitButton onClick={() => navigate('/pickle-create-2')}>장소 등록후 다음 단계로 넘어가기</SubmitButton>
    </Container>
  );
}
