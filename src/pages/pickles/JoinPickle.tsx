import useAuth from '@/hooks/zustand/useAuth';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Container } from './CreatePickleStyled';

import PaymentWindow from '@/components/picklePayment/PaymentComponent';
import styled from '@emotion/styled';
import CloseIcon from '@/assets/icons/CloseIcon';

import { useGetPickelDetail } from '@/hooks/query/pickles';
import client from '@/apis/axios';

declare global {
  interface Window {
    IMP: any;
  }
}

export default function JoinPickle() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const { pickleId } = location.state;
  const { data } = useGetPickelDetail(pickleId);
  const pickleData = useMemo(
    () => ({
      category: data.data.category,
      imgUrl: data.data.imgUrl,
      title: data.data.title,
      cost: data.data.cost,
      capacity: data.data.capacity,
      when: data.data.when,
    }),
    [],
  );

  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [point, setPoint] = useState(0);
  const [usePointValue, setUsePointValue] = useState(0);
  const [isAgree, setIsAgree] = useState(false);

  const { IMP } = window;

  async function getPoints() {
    try {
      const res = await client.get('/users/points');
      if (res.status === 200) {
        setPoint(res.data.points);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getPoints();
  }, []);

  async function onClickPayment() {
    if (pickleData.cost - usePointValue < 0) {
      alert('포인트를 잘못 사용하셨습니다.');
      return;
    }
    if (!paymentMethod || !isAgree) {
      alert('결제 수단과 약관에 동의해주세요.');
      return;
    }
    if (pickleData.cost - usePointValue === 0) {
      console.log('free');
      try {
        const notified = await client.post('/pickle/join', {
          imp_uid: null,
          discount: usePointValue,
          pickle_id: pickleId,
        });
        alert('결제 및 신청이 완료되었습니다.');
      } catch (err: any) {
        alert(err.response.data.message);
      }
      navigate(`/pickle/${pickleId}`, { replace: true });
    } else {
      const data = {
        pg: `${paymentMethod === 'kakaopay' ? 'kakaopay.TC0ONETIME' : 'tosspay.tosstest'}`,
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`, // 해당 피클의 아이디?
        amount: pickleData.cost - usePointValue,
        custom_data: { pickle_id: pickleId, discount: usePointValue },
        name: `${pickleData.title} 신청하기`,
        buyer_name: user.name,
        m_redirect_url: `${window.location.origin.toString()}/join-redirect?pickle_id=${pickleId}&`,
      };

      IMP.init('imp88171622');

      IMP.request_pay(data, async (response: any) => {
        if (!response.success) {
          alert(`결제에 실패했습니다: ${response.error_msg}`);
          navigate(`/pickle/${pickleId}`, { replace: true });
        }
        try {
          const notified = await client.post('/pickle/join', {
            imp_uid: response.imp_uid,
            pickle_id: pickleId,
          });
          alert('결제 및 신청이 완료되었습니다.');
        } catch (err: any) {
          alert(err.response.data.message);
        }
        navigate(`/pickle/${pickleId}`, { replace: true });
      });
    }
  }

  return (
    <Container>
      <S.Wrapper>
        <S.Inner>
          <S.CancleButton onClick={() => navigate(-1)}>
            <S.IconBox>
              <CloseIcon />
            </S.IconBox>
          </S.CancleButton>
          <S.Title>피클 신청</S.Title>
        </S.Inner>
      </S.Wrapper>
      <PaymentWindow.Section>
        {' '}
        <PaymentWindow.PreviewPickle
          data={{
            category: pickleData.category,
            imgUrl: pickleData.imgUrl,
            title: pickleData.title,
            cost: pickleData.cost,
            capacity: pickleData.capacity,
            when: pickleData.when,
          }}
          type="join"
        />
      </PaymentWindow.Section>
      <PaymentWindow.Section>
        <PaymentWindow.Point cost={pickleData.cost} totalPoint={point} setUsePoint={setUsePointValue} />
      </PaymentWindow.Section>
      <PaymentWindow.Section>
        <PaymentWindow.FinalAmount total={pickleData.cost} usePoint={usePointValue} />
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
        <S.Notice>* 1주 이내 모집이 완료되지 않으면 피클은 사라집니다.</S.Notice>
        <S.Notice>* 사라진 피클은 입금 계좌로 영업일 2~3일 이내 환불됩니다.</S.Notice>
      </S.Wrap>
      <S.PaymentButton onClick={onClickPayment} disabled={!paymentMethod || !isAgree}>
        {pickleData.cost - usePointValue}원 결제하기
      </S.PaymentButton>
    </Container>
  );
}

const S = {
  Wrapper: styled.div`
    width: 100%;
    padding: 8.5rem 3.2rem 0;
    background: #fff;
    margin-bottom: -1.6rem;
  `,
  IconBox: styled.span`
    display: inline-block;
    height: 2.4rem;
  `,
  Inner: styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
  `,
  Title: styled.h1`
    font-size: 2.4rem;
    font-weight: 600;
  `,
  CancleButton: styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
  `,
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
    background-color: var(--Main-Color, #5dc26d);
    color: white;
    font-size: 1.4rem;

    &:disabled {
      background-color: #d0d0d0;
      cursor: auto;
    }

    transition: background-color 0.3s;
  `,
};
