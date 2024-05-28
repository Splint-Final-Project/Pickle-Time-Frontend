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
      m_redirect_url: '/payment-redirect',
    };

    IMP.init('imp88171622');
    IMP.request_pay(data, async (response: any) => {
      // const { success, merchant_uid, error_msg } = response;
      if (!response.success) {
        return alert(`결제에 실패하였습니다. 에러 내용: ${response.error_msg}`);
      }
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Origin', 'http://localhost:5173');
      const notified = await fetch(`http://localhost:8080/verify_iamport/${response.imp_uid}`, {
        method: 'POST',
        headers: headers,
        // body: JSON.stringify({
        //   imp_uid: response.imp_uid,
        //   merchant_uid: response.merchant_uid,
        // }),
        mode: 'cors',
      });
      console.log(notified);
      alert('결제에 성공하였습니다?');
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
