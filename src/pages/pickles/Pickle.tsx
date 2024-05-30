
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
      // buyer_tel: '01012341234',
      // buyer_email: 'test@example.com',
      // buyer_addr: '삼일대로 343',
      // buyer_postcode: '04538',
      m_redirect_url: `${window.location.origin.toString()}/payment-redirect`,
    };
    IMP.init('imp88171622');
    IMP.request_pay(data, async (response: any) => {
      if (!response.success) {
        return alert(`에러 내용: ${response.error_msg}`);
      }
      const notified = await fetch(`${import.meta.env.VITE_BACKEND_URL}/verify_iamport/${response.imp_uid}`, {
        method: 'POST',
      });
      console.log(notified);
      const notifiedText = await notified.text(); // Fix: Use the text() method instead of string()
      console.log(notifiedText);
      //notified http status에 따라 분기.
      //OK의 경우에는 성공했다고 띄우고 피클 페이지로 이동(신청버튼이 '신청함'으로 바뀌고비활성화됨)
      //실패의 경우에는 실패했다고 띄우고 다시 그 피클 페이지
      //같은 작업을 redirect url에서도 해야함
      alert('피클 신청에 성공하였습니다?');
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
