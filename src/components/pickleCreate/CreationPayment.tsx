import useAuth from '@/hooks/zustand/useAuth';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '@/apis/axios';
import PaymentWindow from '@/components/picklePayment/PaymentComponent';
import styled from '@emotion/styled';
import { useMyPoints } from '@/hooks/query/points';
import { showErrorToast, showToast } from '@/components/common/Toast';

export default function CreationPayment() {
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

  const { data: pointsdata } = useMyPoints();
  const point = pointsdata?.data?.points;

  async function onClickPayment() {
    if (cost - usePointValue < 0) {
      showErrorToast('포인트를 잘못 사용하셨습니다.');
      return;
    }

    if (!paymentMethod || !isAgree) {
      showErrorToast('결제 수단과 약관 동의를 확인해주세요.');
      return;
    }

    if (cost - usePointValue === 0) {
      try {
        const notified = await client.post('/pickle/create', {
          imp_uid: null,
          discount: usePointValue,
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
        });

        if (notified.status === 201) {
          showToast('전액 포인트로 피클 생성이 완료되었요!');
          clear();

          navigate(`/pickle/${notified.data.pickle._id}`, { replace: true });
        } else {
          showErrorToast('피클 생성이 실패하여 결제 금액은 환불되었어요' + notified.data.message);

          navigate(`/pickle-create`, { replace: true });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const data = {
        pg: `${paymentMethod === 'kakaopay' ? 'kakaopay.TC0ONETIME' : 'tosspay.tosstest'}`,
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: cost - usePointValue,
        name: `${title} 생성하기`,
        buyer_name: user.nickname,
        custom_data: {
          discount: usePointValue,
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
          showErrorToast(`결제에 실패했습니다: ${response.error_msg}`);
          navigate(`/pickle-create`, { replace: true });
        }

        try {
          const notified = await client.post('/pickle/create', {
            imp_uid: response.imp_uid,
          });
          if (notified.status === 201) {
            showToast('결제 및 피클 생성이 완료되었습니다.');
            clear();
            navigate(`/pickle/${notified.data.pickle._id}`, { replace: true });
          } else {
            showErrorToast('피클 생성이 실패하여 결제 금액은 환불되었습니다.' + notified.data.message);
            navigate(`/pickle-create`, { replace: true });
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PaymentWindow.Section>
        <></>
        <PaymentWindow.PreviewPickle
          data={{
            category,
            imgUrl,
            title,
            cost,
            capacity,
            when,
          }}
          type="create"
        />
      </PaymentWindow.Section>
      <PaymentWindow.Section>
        <PaymentWindow.Point cost={cost} totalPoint={point} setUsePoint={setUsePointValue} />
      </PaymentWindow.Section>
      <PaymentWindow.Section>
        <PaymentWindow.FinalAmount total={cost} usePoint={usePointValue} />
      </PaymentWindow.Section>
      {cost - usePointValue !== 0 && (
        <PaymentWindow.Section>
          <PaymentWindow.Methods disabled={cost - usePointValue === 0} setState={setPaymentMethod} />
        </PaymentWindow.Section>
      )}
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
      <S.PaymentButton onClick={onClickPayment} disabled={!isAgree && cost - usePointValue !== 0 && !paymentMethod}>
        {cost - usePointValue ? `${cost - usePointValue}원 결제하기` : '피클 생성하기'}
      </S.PaymentButton>
    </>
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
    margin: 0 20px 120px;
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
