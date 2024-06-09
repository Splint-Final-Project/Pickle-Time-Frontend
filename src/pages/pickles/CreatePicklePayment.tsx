import client from '@/apis/axios';
import useAuth from '@/hooks/zustand/useAuth';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePicklePayment() {
  const { IMP } = window;
  const { getMe } = useAuth();
  const user = getMe();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>('kakaopay');
  const { title, capacity, cost, deadLine, where, when, category, explanation, viewCount, latitude, longitude, clear } =
    usePickleCreation();
  if (
    !title ||
    !capacity ||
    !cost ||
    // !deadLine ||
    !where ||
    // !when ||
    !category ||
    !explanation ||
    // !viewCount ||
    !latitude ||
    !longitude
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
        where,
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

      const notified = await client.post('/pickle/create', {
        imp_uid: response.imp_uid,
      });

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
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>{title}를 생성하기 위한 결제하기</h1>
        <div>총 금액 {cost}원</div>
        <input type="checkbox" />
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
        </span>
        <button onClick={onClickPayment}> 결제하기</button>
      </div>
    </div>
  );
}
