import styled from '@emotion/styled';
import KakaoPayLogo from '@/assets/images/kakaopayLogo.png';
import TossPayLogo from '@/assets/images/tosspayLogo.png';

interface PaymentMeansProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function PaymentMeans({ setState }: PaymentMeansProps) {
  return (
    <>
      <S.Title>결제방법</S.Title>
      <S.InputWrap>
        <S.Input
          id="tosspay"
          value="tosspay"
          type="radio"
          name="paymentMethod"
          checked
          onChange={e => setState(e.target.value)}
        />
        <S.Label htmlFor="tosspay">
          <S.PayLogoImg src={TossPayLogo} alt="토스페이 로고 이미지" />
          <S.PayText>토스 페이</S.PayText>
        </S.Label>
      </S.InputWrap>
      <S.InputWrap>
        <S.Input
          id="kakaopay"
          value="kakaopay"
          type="radio"
          name="paymentMethod"
          onChange={e => setState(e.target.value)}
        />
        <S.Label htmlFor="kakaopay">
          <S.PayLogoImg src={KakaoPayLogo} alt="카카오페이 로고 이미지" />
          <S.PayText>카카오 페이</S.PayText>
        </S.Label>
      </S.InputWrap>
    </>
  );
}

const S = {
  Title: styled.span`
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
  `,
  InputWrap: styled.div`
    padding: 1.2rem 0;
    display: flex;
    align-items: center;
    position: relative;
  `,
  Input: styled.input`
    appearance: none;
    margin: 0;
    border: 2px solid #d0d0d0;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 1.2rem;
    &:checked {
      border: 5px solid #5dc26d;
    }
    &::before {
      content: '';
      width: 100%;
      position: absolute;
      height: 1px;
      background: #d0d0d0;
      bottom: 0;
    }
    &::after {
      content: '';
      position: absolute;
      width: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
      background-color: #5dc26d;
      transition: width 0.3s ease-in-out;
      transform-origin: center;
      bottom: 0;
    }
    &:checked::after {
      width: 100%;
    }
  `,
  Label: styled.label`
    display: inline-flex;
    align-items: center;
  `,
  PayLogoImg: styled.img`
    padding-right: 1.2rem;
    object-fit: cover;
  `,
  PayText: styled.span`
    font-size: 1.3rem;
    color: #8b8d94;
  `,
};
