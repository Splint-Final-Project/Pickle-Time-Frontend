import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import client from '@/apis/axios';

import PaymentWindow from '@/components/picklePayment/PaymentComponent';
import ConfirmationModal from '@/components/common/modal/ConfirmationModal';
import { showErrorToast, showToast } from '@/components/common/Toast';
import { Container } from './CreatePickleStyled';
import useAuth from '@/hooks/zustand/useAuth';
import { useGetPickleDetail } from '@/hooks/query/pickles';
import { useMyPoints } from '@/hooks/query/points';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import CloseIcon from '@/assets/icons/CloseIcon';

declare global {
  interface Window {
    IMP: any;
  }
}

export default function JoinPickle() {
  const navigate = useNavigate();
  const { id: pickleId = '' } = useParams();

  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [usePointValue, setUsePointValue] = useState(0);
  const [isAgree, setIsAgree] = useState(false);

  const { user } = useAuth();
  const { data } = useGetPickleDetail(pickleId);
  const pickleData = data?.data;

  const { data: pointsdata } = useMyPoints();
  const point = pointsdata?.data?.points;

  const { IMP } = window;
  const { handleOpen } = useBottomSheetModal(state => state);

  async function onClickPayment() {
    if (pickleData.cost - usePointValue < 0) {
      showErrorToast('포인트를 잘못 사용했어요!');
      return;
    }
    if (!paymentMethod || !isAgree) {
      showErrorToast('결제 수단과 약관에 동의해주세요.');
      return;
    }
    if (pickleData.cost - usePointValue === 0) {
      console.log('free');
      try {
        const notified = await client.post('/pickle/join', {
          imp_uid: null,
          discount: usePointValue,
          pickle_id: pickleId,
        });
        showToast('신청이 완료되었어요!');
      } catch (err: any) {
        showErrorToast(err.response.data.message);
      }
      navigate(`/pickle/${pickleId}`, { replace: true });
    } else {
      const data = {
        pg: `${paymentMethod === 'kakaopay' ? 'kakaopay.TC0ONETIME' : 'tosspay.tosstest'}`,
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`, // 해당 피클의 아이디?
        amount: pickleData.cost - usePointValue,
        custom_data: { pickle_id: pickleId, discount: usePointValue },
        name: `${pickleData.title} 신청하기`,
        buyer_name: user.name,
        m_redirect_url: `${window.location.origin.toString()}/join-redirect?pickle_id=${pickleId}&`,
      };

      IMP.init('imp88171622');

      IMP.request_pay(data, async (response: any) => {
        if (!response.success) {
          showErrorToast(`결제에 실패했습니다: ${response.error_msg}`);
          navigate(`/pickle/${pickleId}`, { replace: true });
        }
        try {
          const notified = await client.post('/pickle/join', {
            imp_uid: response.imp_uid,
            pickle_id: pickleId,
          });
          showToast('결제 및 신청이 완료되었어요!');
        } catch (err: any) {
          showErrorToast(err.response.data.message);
        }
        navigate(`/pickle/${pickleId}`, { replace: true });
      });
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <S.Wrapper>
        <S.Inner>
          <S.CancelButton
            onClick={() =>
              handleOpen({
                renderComponent: ConfirmationModal,
                nocallback: () => {},
                yescallback: () => navigate('/pickle/' + pickleId, { replace: true }),
                message: '신청을 취소하시겠습니까?',
                yesText: '확인',
                noText: '취소',
              })
            }
          >
            <S.IconBox>
              <CloseIcon />
            </S.IconBox>
          </S.CancelButton>
          <S.Title>피클 신청</S.Title>
        </S.Inner>
      </S.Wrapper>
      {pickleData && (
        <>
          <PaymentWindow.Section>
            {' '}
            <PaymentWindow.PreviewPickle
              data={{
                category: pickleData.category,
                imgUrl: pickleData.imgUrl,
                title: pickleData.title,
                cost: pickleData.cost,
                capacity: pickleData.capacity,
                when: pickleData.when,
              }}
              type="join"
            />
          </PaymentWindow.Section>
          <PaymentWindow.Section>
            <PaymentWindow.Point cost={pickleData.cost} totalPoint={point} setUsePoint={setUsePointValue} />
          </PaymentWindow.Section>
          <PaymentWindow.Section>
            <PaymentWindow.FinalAmount total={pickleData.cost} usePoint={usePointValue} />
          </PaymentWindow.Section>
          <PaymentWindow.Section>
            <PaymentWindow.Methods disabled={pickleData.cost - usePointValue === 0} setState={setPaymentMethod} />
          </PaymentWindow.Section>
          <PaymentWindow.Section>
            <PaymentWindow.PaymentEvent />
          </PaymentWindow.Section>
          <PaymentWindow.Section>
            <PaymentWindow.PaymentTerms setState={setIsAgree} />
          </PaymentWindow.Section>
          <S.Wrap>
            <S.Notice>* 1주 이내 모집이 완료되지 않으면 피클은 사라집니다.</S.Notice>
            <S.Notice>* 사라진 피클은 입금 계좌로 영업일 2~3일 이내 환불됩니다.</S.Notice>
          </S.Wrap>
          <S.PaymentButton onClick={onClickPayment} disabled={!paymentMethod || !isAgree}>
            {pickleData.cost - usePointValue}원 결제하기
          </S.PaymentButton>
        </>
      )}
    </Container>
  );
}

const S = {
  Wrapper: styled.div`
    width: 100%;
    padding: 8.5rem 3.2rem 0;
    background: #fff;
    margin-bottom: -1.6rem;
  `,
  IconBox: styled.span`
    display: inline-block;
    height: 2.4rem;
  `,
  Inner: styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
  `,
  Title: styled.h1`
    font-size: 2.4rem;
    font-weight: 600;
  `,
  CancelButton: styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
  `,
  Wrap: styled.div`
    padding: 1.6rem 2rem;
  `,
  Notice: styled.p`
    color: #8b8d94;
    font-size: 1.2rem;
    &:nth-of-type(1) {
      margin-bottom: 0.8rem;
    }
  `,
  PaymentButton: styled.button`
    margin: 0 2rem 12rem;
    height: 4.2rem;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.color.primary};
    transition: background-color 0.3s;
    color: ${({ theme }) => theme.color.white};
    font-size: 1.4rem;

    &:disabled {
      background-color: #d0d0d0;
      cursor: auto;
    }
  `,
};
