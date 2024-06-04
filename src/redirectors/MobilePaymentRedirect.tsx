import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export default function MobilePaymentRedirect() {
  const [searchParams] = useSearchParams();
  async function handlePayment() {
    const notified = await fetch(`${import.meta.env.VITE_BACKEND_URL}/payment/verify/${searchParams.get('imp_uid')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(notified);
    const notifiedText = await notified.text(); // Fix: Use the text() method instead of string()
    console.log(notifiedText);
    //notified http status에 따라 분기.
    //OK의 경우에는 성공했다고 띄우고 피클 페이지로 이동(신청버튼이 '신청함'으로 바뀌고비활성화됨)
    //실패의 경우에는 실패했다고 띄우고 다시 그 피클 페이지
    //같은 작업을 redirect url에서도 해야함
    alert('피클 신청에 성공하였습니다?');
  }
  useEffect(() => {
    if (!searchParams.get('imp_success')) {
      alert(`에러 내용: ${searchParams.get('error_msg')}`);
    } else {
      handlePayment();
    }
  }, []);
  return <div>결제 진행 중... 창을 닫지 마세요</div>;
}
