import useAuth from '@/hooks/zustand/useAuth';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, StepIndicator, StepIndicatorContainer, Title, TitleContainer } from './CreatePickleStyled';
import PaymentWindow from '@/components/picklePayment/PaymentComponent';
import styled from '@emotion/styled';
import client from '@/apis/axios';

export default function CreatePickle4() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    title,
    category,
    capacity,
    imgUrl,
    explanation,
    goals,
    cost,
    place,
    address,
    detailedAddress,
    areaCode,
    latitude,
    longitude,
    when,
    deadLine,
    clear,
  } = usePickleCreation();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [usePointValue, setUsePointValue] = useState(0);
  const [isAgree, setIsAgree] = useState(false);

  const { IMP } = window;

  function onClickPayment() {
    const data = {
      pg: `${paymentMethod === 'kakaopay' ? 'kakaopay.TC0ONETIME' : 'tosspay.tosstest'}`,
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: cost - usePointValue,
      name: `${title} 생성하기`,
      buyer_name: user.nickname,
      custom_data: {
        title,
        category,
        capacity,
        imgUrl,
        explanation,
        goals,
        cost,
        place,
        address,
        detailedAddress,
        areaCode,
        latitude,
        longitude,
        when,
        deadLine,
      },
      m_redirect_url: `${window.location.origin.toString()}/create-redirect`,
    };
    IMP.init('imp88171622');
    IMP.request_pay(data, async (response: any) => {
      if (!response.success) {
        alert(`결제에 실패했습니다: ${response.error_msg}`);
        navigate(`/pickle-create`, { replace: true });
      }
      try {
        const notified = await client.post('/pickle/create', {
          imp_uid: response.imp_uid,
        });
        if (notified.status === 201) {
          alert('결제 및 피클 생성이 완료되었습니다.');
          clear();
          navigate(`/pickle/${notified.data.pickle._id}`, { replace: true });
        } else {
          alert('피클 생성이 실패하여 결제 금액은 환불되었습니다.' + notified.data.message);
          navigate(`/pickle-create-1`, { replace: true });
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

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
        <></>
        <PaymentWindow.PreviewPickle
          data={{
            category,
            imgUrl,
            title,
            cost,
            capacity,
            summary: when.summary,
          }}
          type="create"
        />
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
      <S.PaymentButton onClick={onClickPayment} disabled={!paymentMethod || !isAgree}>
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
      cursor: not-allowed;
    }
  `,
};
