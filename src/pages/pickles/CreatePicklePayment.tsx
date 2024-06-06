import client from '@/apis/axios';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import React, { useState } from 'react';

export default function CreatePicklePayment() {
  const { IMP } = window;
  const [paymentMethod, setPaymentMethod] = useState<string>('kakaopay');
  const { title, capacity, cost, deadLine, where, when, content, explanation, viewCount, latitude, longitude } =
    usePickleCreation();
  function onClickPayment() {
    const data = {
      pg: `${paymentMethod === 'kakaopay' ? 'kakaopay.TC0ONETIME' : 'tosspay.tosstest'}`,
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`, // 해당 피클의 아이디?
      amount: cost,
      name: '아임포트 결제 데이터 분석',
      buyer_name: '홍길동',
      // m_redirect_url: `${window.location.origin.toString()}/payment-redirect?pickle_id=${pickleId}&`,
    };

    IMP.init('imp88171622');

    IMP.request_pay(data, async (response: any) => {
      if (!response.success) {
        return alert(`에러 내용: ${response.error_msg}`);
      }

      const notified = await client.post('/pickle/create', {
        imp_uid: response.imp_uid,
        title,
        capacity,
        cost,
        deadLine,
        where,
        when,
        content,
        explanation,
        viewCount,
        latitude,
        longitude,
      });

      // 결제 성공(피클도 생성됨) 결과에 따라 분기

      const notifiedText = notified.data();
      alert(notifiedText);
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
