import client from '@/apis/axios';

interface CustomDataType {}

export type PaymentDataType = {
  pg: 'kakaopay.TC0ONETIME' | 'tosspay.tosstest';
  pay_method: 'card';
  merchant_uid: string;
  amount: number;
  name: string;
  buyer_name: any;
  custom_data: CustomDataType;
  m_redirect_url: string;
};

interface paymentCallProps {
  paymentData: PaymentDataType;
  successCallback: () => void;
  errorCallback: (message: string) => void;
}

export default function paymentCall({ paymentData, successCallback, errorCallback }: paymentCallProps) {
  const { IMP } = window;

  IMP.init('imp88171622');
  IMP.request_pay(paymentData, async (response: any) => {
    if (!response.success) {
      errorCallback(response.error_msg);
    }
    try {
      const notified = await client.post('/pickle/create', {
        imp_uid: response.imp_uid,
      });
      console.log(notified);
      if (notified.status === 201) {
        successCallback();
      } else {
        errorCallback(notified.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  });
}
// const data = {
//   pg: `${paymentMethod === 'kakaopay' ? 'kakaopay.TC0ONETIME' : 'tosspay.tosstest'}`,
//   pay_method: 'card',
//   merchant_uid: `mid_${new Date().getTime()}`, // 해당 피클의 아이디?
//   amount: cost,
//   name: `${title} 생성하기`,
//   buyer_name: user.name,
//   custom_data: {
//     title,
//     capacity,
//     cost,
//     deadLine,
//     when,
//     category,
//     explanation,
//     viewCount,
//   },
//   m_redirect_url: `${window.location.origin.toString()}/create-redirect`,
// };
