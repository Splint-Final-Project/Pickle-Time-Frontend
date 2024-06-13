import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface TotalPaymentProps {
  total: number;
  usePoint: number;
}

export default function TotalPayment({ total, usePoint }: TotalPaymentProps) {
  return (
    <>
      <S.Wrap>
        <S.Title>총 결제 금액</S.Title>
        <S.TotalPrice>{(total - usePoint).toLocaleString()}원</S.TotalPrice>
      </S.Wrap>
      <S.Line />
      <S.Wrap $center $mgB>
        <S.AmountKind>피클 금액</S.AmountKind>
        <S.Price>{total.toLocaleString()}원</S.Price>
      </S.Wrap>
      <S.Wrap $center>
        <S.AmountKind>할인 금액</S.AmountKind>
        <S.Price>-{usePoint.toLocaleString()}원</S.Price>
      </S.Wrap>
    </>
  );
}

const S = {
  Wrap: styled.div<{ $center?: boolean; $mgB?: boolean }>`
    display: flex;
    justify-content: space-between;
    ${({ $center }) =>
      $center &&
      css`
        align-items: center;
      `}
    ${({ $mgB }) =>
      $mgB &&
      css`
        margin-bottom: 1.6rem;
      `}
  `,
  Title: styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    line-height: normal;
    font-style: normal;
  `,
  TotalPrice: styled.em`
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: #5dc26d;
    margin-top: 3px;
  `,
  Line: styled.div`
    height: 1px;
    background: #d0d0d0;
    margin: 1.2rem 0;
  `,
  AmountKind: styled.span`
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  Price: styled.em`
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
};
