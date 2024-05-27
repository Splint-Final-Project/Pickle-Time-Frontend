import { useState } from 'react';

declare global {
  interface Window {
    IMP: any;
  }
}
export default function Pickle() {
  const { IMP } = window;
  const [paymentMethod, setPaymentMethod] = useState<string>('kakaopay');
  function onClickPayment() {
    const data = {
      pg: `${paymentMethod === 'kakaopay' ? 'kakaopay.TC0ONETIME' : 'tosspay.tosstest'}`,
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: 1000,
      name: '아임포트 결제 데이터 분석',
      buyer_name: '홍길동',
      buyer_tel: '01012341234',
      buyer_email: 'test@example.com',
      buyer_addr: '삼일대로 343',
      buyer_postcode: '04538',
      m_redirect_url: `http://172.20.10.8:5173/payment-redirect`,
    };

    IMP.init('imp88171622');
    IMP.request_pay(data, (response: any) => {
      alert(JSON.stringify(response));
      // const { success, merchant_uid, error_msg } = response;
      if (!response.success) {
        return alert(`결제에 실패하였습니다. 에러 내용: ${response.error_msg}`);
      }
      alert('결제에 성공하였습니다.');
      // const notified = await fetch(`${SERVER_BASE_URL}/payment/complete`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     imp_uid: response.imp_uid,
      //     merchant_uid: response.merchant_uid,
      //   }),
      // });
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>피클입니다</h1>
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
