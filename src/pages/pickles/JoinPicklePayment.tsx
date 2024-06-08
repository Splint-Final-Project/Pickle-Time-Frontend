import client from '@/apis/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useLocation } from 'react-router';
declare global {
  interface Window {
    IMP: any;
  }
}

export default function JoinPicklePayment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { pickleId, pickleName, pickleCost } = state as any;
  // console.log(state);
  // if (!pickleId || !pickleName || !pickleCost) {
  //   return <div>피클 정보가 부족합니다.</div>;
  // }
  const { IMP } = window;
  const [paymentMethod, setPaymentMethod] = useState<string>('kakaopay');

  function onClickPayment() {
    const data = {
      pg: `${paymentMethod === 'kakaopay' ? 'kakaopay.TC0ONETIME' : 'tosspay.tosstest'}`,
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`, // 해당 피클의 아이디?
      amount: pickleCost,
      name: '아임포트 결제 데이터 분석',
      buyer_name: '홍길동',
      m_redirect_url: `${window.location.origin.toString()}/payment-redirect?pickle_id=${pickleId}&`,
    };

    IMP.init('imp88171622');

    IMP.request_pay(data, async (response: any) => {
      if (!response.success) {
        return alert(`에러 내용: ${response.error_msg}`);
      }

      const notified = await client.post('/pickle/join', {
        imp_uid: response.imp_uid,
        pickle_id: pickleId,
      });
      if (notified.status === 200) {
        alert('결제 및 신청이 완료되었습니다.');
      } else {
        alert('신청이 실패하여 결제 금액은 환불되었습니다.' + notified.data.message);
      }
      navigate(`/pickles/${pickleId}`);
      //notified http status에 따라 분기.
      //OK의 경우에는 성공했다고 띄우고 피클 페이지로 이동(신청버튼이 '신청함'으로 바뀌고비활성화됨)
      //실패의 경우에는 실패했다고 띄우고 다시 그 피클 페이지
      //같은 작업을 redirect url에서도 해야함
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>{pickleName}에 신청하기 위한 결제하기</h1>
        <div>총 금액 {pickleCost}원</div>
        <input type="checkbox" /> 결제정보에동의
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
