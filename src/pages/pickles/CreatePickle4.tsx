import useAuth from '@/hooks/zustand/useAuth';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, StepIndicator, StepIndicatorContainer, Title, TitleContainer } from './CreatePickleStyled';
import PaymentWindow from '@/components/picklePayment/PaymentComponent';
import styled from '@emotion/styled';
import paymentCall, { PaymentDataType } from '@/utils/paymentCall';

export default function CreatePickle4() {
  const { getMe } = useAuth();
  const user = getMe();
  const navigate = useNavigate();
  const { title, capacity, cost, deadLine, when, category, explanation, viewCount, latitude, longitude, clear } =
  usePickleCreation();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [usePointValue, setUsePointValue] = useState(0);
  const [isAgree, setIsAgree] = useState(false);

  const paymentData: PaymentDataType = useMemo(
    () => ({
      pg: `${paymentMethod === 'kakaopay' ? 'kakaopay.TC0ONETIME' : 'tosspay.tosstest'}`,
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: cost - usePointValue,
      name: `${title} 생성하기`,
      buyer_name: user.nickname,
      custom_data: {
        title,
        capacity,
        cost,
        deadLine,
        place,
        latitude,
        longitude,
        when,
        category,
        explanation,
        imgUrl,
      },
      m_redirect_url: `${window.location.origin.toString()}/create-redirect`,
    }),

    [paymentMethod, usePointValue],
  );

  const pickleData = useMemo(
    () => ({
      category,
      imgUrl,
      title,
      cost,
      capacity,
      summary: when.summary,
    }),
    [],
  );

  const successPayment = () => {
    alert('성공');
    clear();
  };

  const errorPayment = (message: string) => {
    alert(message);
  };

  return (
    <Container>
      <TitleContainer>
        <Title>
          <img src="icons/back.svg" alt="back" onClick={() => navigate('/pickle-create-3')} />
          <div>피클 생성</div>
        </Title>
        <StepIndicatorContainer>
          <StepIndicator $selected={false}>1</StepIndicator>
          <StepIndicator $selected={false}>2</StepIndicator>
          <StepIndicator $selected={false}>3</StepIndicator>
          <StepIndicator $selected={true}>4</StepIndicator>
        </StepIndicatorContainer>
      </TitleContainer>
      <PaymentWindow.Section>
        <PaymentWindow.PreviewPickle data={pickleData} type="create" />
      </PaymentWindow.Section>
      <PaymentWindow.Section>
        {/* TODO :포인트 api연결하기 */}
        <PaymentWindow.Point totalPoint={1500} setUsePoint={setUsePointValue} />
      </PaymentWindow.Section>
      <PaymentWindow.Section>
        <PaymentWindow.FinalAmount total={cost} usePoint={usePointValue} />
      </PaymentWindow.Section>
      <PaymentWindow.Section>
        <PaymentWindow.Methods setState={setPaymentMethod} />
      </PaymentWindow.Section>
      <PaymentWindow.Section>
        <PaymentWindow.PaymentEvent />
      </PaymentWindow.Section>
      <PaymentWindow.Section>
        <PaymentWindow.PaymentTerms setState={setIsAgree} />
      </PaymentWindow.Section>
      <S.Wrap>
        <S.Notice>* 2주 이내 모집이 완료되지 않으면 피클은 사라집니다.</S.Notice>
        <S.Notice>* 사라진 피클은 입금 계좌로 영업일 2~3일 이내 환불됩니다.</S.Notice>
      </S.Wrap>
      <S.PaymentButton
        onClick={() =>
          paymentCall({ paymentData: paymentData, successCallback: successPayment, errorCallback: errorPayment })
        }
        disabled={!paymentMethod || !isAgree}
      >
        {cost - usePointValue}원 결제하기
      </S.PaymentButton>
    </Container>
  );
}

const S = {
  Wrap: styled.div`
    padding: 1.6rem 2rem;
  `,
  Notice: styled.p`
    color: #8b8d94;
    font-size: 1.2rem;
    &:nth-of-type(1) {
      margin-bottom: 0.8rem;
    }
  `,
  PaymentButton: styled.button`
    margin: 0 20px;
    height: 42px;
    border-radius: 4px;
    background: var(--Main-Color, #5dc26d);
    color: white;
    font-size: 1.4rem;

    &:disabled {
      background: #d0d0d0;
      cursor: auto;
    }
  `,
};
