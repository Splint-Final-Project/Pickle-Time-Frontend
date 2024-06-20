import client from '@/apis/axios';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function PickleCreationRedirector() {
  const [searchParams] = useSearchParams();
  const { clear } = usePickleCreation();
  const navigate = useNavigate();

  async function handlePayment() {
    try {
      const notified = await client.post('/pickle/create', {
        imp_uid: searchParams.get('imp_uid'),
      });
      if (notified.status === 201) {
        toast.success('결제 및 피클 생성이 완료되었습니다.');
        clear();
        navigate(`/pickle/${notified.data.pickle._id}`, { replace: true });
      } else {
        toast.error('피클 생성이 실패하여 결제 금액은 환불되었습니다. ' + notified.data.message);
        navigate(`/pickle-create-1`, { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const success = searchParams.get('imp_success');
    if (success === 'false') {
      toast.error(`결제에 실패했습니다: ${searchParams.get('error_msg')}`);
      navigate(`/pickle-create`, { replace: true });
    } else {
      handlePayment();
    }
  }, []);

  return <div>결제 진행 중... 창을 닫지 마세요</div>;
}
