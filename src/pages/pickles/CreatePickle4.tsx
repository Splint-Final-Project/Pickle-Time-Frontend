import client from '@/apis/axios';
import useAuth from '@/hooks/zustand/useAuth';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import React, { useState } from 'react';
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

export default function CreatePickle4() {
  const { IMP } = window;
  const { getMe } = useAuth();
  const user = getMe();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>('kakaopay');
  const { title, capacity, cost, deadLine, when, place, category, explanation, viewCount, latitude, longitude, imgUrl, clear } =
    usePickleCreation();

  if (
    !title ||
    !capacity ||
    !cost ||
    // !deadLine ||
    // !where ||
    // !when ||
    !category ||
    !explanation
    // !viewCount ||
    // !latitude ||
    // !longitude
  ) {
    return <div>피클 정보가 부족합니다.</div>;
  }
  function onClickPayment() {
    const data = {
      pg: `${paymentMethod === 'kakaopay' ? 'kakaopay.TC0ONETIME' : 'tosspay.tosstest'}`,
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`, // 해당 피클의 아이디?
      amount: cost,
      name: `${title} 생성하기`,
      buyer_name: user.name,
      custom_data: {
        title,
        capacity,
        cost,
        deadLine,
        place,
        when,
        category,
        explanation,
        viewCount,
        latitude,
        longitude,
      },
      m_redirect_url: `${window.location.origin.toString()}/create-redirect`,
    };

    IMP.init('imp88171622');

    IMP.request_pay(data, async (response: any) => {
      if (!response.success) {
        alert(`결제에 실패했습니다: ${response.error_msg}`);
        navigate(`/pickle-create`, { replace: true });
      }

      const formData = new FormData();
      formData.append('image', imgUrl);
      formData.append('imp_uid', response.imp_uid);

      const notified = await client.post('/pickle/create', formData);

      // 결제 성공(피클도 생성됨) 결과에 따라 분기
      console.log(notified);
      if (notified.status === 201) {
        alert('결제 및 피클 생성이 완료되었습니다.');
        clear();
        navigate(`/pickle/${notified.data.pickle._id}`, { replace: true });
      } else {
        alert('피클 생성이 실패하여 결제 금액은 환불되었습니다.' + notified.data.message);
        navigate(`/pickle-create`, { replace: true });
      }
    });
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
          <StepIndicator $selected={false}>2</StepIndicator>
          <StepIndicator $selected={false}>3</StepIndicator>
          <StepIndicator $selected={true}>4</StepIndicator>
        </StepIndicatorContainer>
      </TitleContainer>

      <InputComponent>
        {' '}
        <span>
          <input
            type="radio"
            id="kakao"
            name="paymentType"
            value="kakaopay"
            onChange={e => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="kakao">카카오페이</label>
        </span>
        <span>
          <input
            type="radio"
            id="toss"
            name="paymentType"
            value="tosspay"
            onChange={e => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="toss">토스페이</label>
        </span>{' '}
      </InputComponent>
      <InputComponent></InputComponent>
      <InputComponent></InputComponent>
      <InputComponent></InputComponent>
      <SubmitButton onClick={onClickPayment}>{cost}원 결제하기</SubmitButton>
    </Container>
  );
}
