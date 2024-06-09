import client from '@/apis/axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PickleJoinRedirector() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  async function handlePayment() {
    const notified = await client.post('/pickle/join', {
      imp_uid: searchParams.get('imp_uid'),
      pickle_id: searchParams.get('pickle_id'),
    });
    if (notified.status === 200) {
      alert('결제 및 신청이 완료되었습니다.');
    } else {
      alert('신청이 실패하여 결제 금액은 환불되었습니다.' + notified.data.message);
    }
    navigate(`/pickles/${searchParams.get('pickle_id')}`, { replace: true });

    //notified http status에 따라 분기.
    //OK의 경우에는 성공했다고 띄우고 피클 페이지로 이동(신청버튼이 '신청함'으로 바뀌고비활성화됨)
    //실패의 경우에는 실패했다고 띄우고 다시 그 피클 페이지
    //같은 작업을 redirect url에서도 해야함
  }
  useEffect(() => {
    const success = searchParams.get('imp_success');
    if (success === 'false') {
      alert(`결제에 실패했습니다: ${searchParams.get('error_msg')}`);
      navigate(`/pickle/${searchParams.get('pickle_id')}`, { replace: true });
    } else {
      handlePayment();
    }
  }, []);
  return <div>결제 진행 중... 창을 닫지 마세요</div>;
}
