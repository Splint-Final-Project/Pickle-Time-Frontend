import client from '@/apis/axios';
import useAuth from '@/hooks/zustand/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useLocation } from 'react-router';
declare global {
  interface Window {
    IMP: any;
  }
}

export default function JoinPickle() {
  const { state } = useLocation();
  const { getMe } = useAuth();
  const user = getMe();
  const navigate = useNavigate();
  const { pickleId, pickleTitle, pickleCost } = state as any;
  // console.log(state);
  // if (!pickleId || !pickleTitle || !pickleCost) {
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
      name: `${pickleTitle} 신청하기`,
      buyer_name: user.name,
      m_redirect_url: `${window.location.origin.toString()}/join-redirect?pickle_id=${pickleId}&`,
    };

    IMP.init('imp88171622');

    IMP.request_pay(data, async (response: any) => {
      if (!response.success) {
        alert(`결제에 실패했습니다: ${response.error_msg}`);
        navigate(`/pickle/${pickleId}`);
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
      navigate(`/pickle/${pickleId}`);
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>{pickleTitle}에 신청하기 위한 결제하기</h1>
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
