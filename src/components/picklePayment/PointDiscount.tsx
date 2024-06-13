import styled from '@emotion/styled';
import { useMemo, useState } from 'react';

interface PointDisCountProps {
  totalPoint: number;
  setUsePoint: React.Dispatch<React.SetStateAction<number>>;
}

export default function PointDisCount({ totalPoint, setUsePoint }: PointDisCountProps) {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('0');
  const [error, setError] = useState('');
  const availablePoint = useMemo(() => Math.floor(totalPoint / 10) * 10, [totalPoint]);
  const handleBlur = () => {
    setIsFocus(false);
    const point = parseInt(value, 10);
    if (point > availablePoint) {
      setError('사용 가능한 포인트를 초과하였습니다.');
    } else if (point % 10 !== 0) {
      setError('포인트는 10단위로 입력해야합니다.');
    } else if (point < 100 && point !== 0) {
      setError('포인트는 100P부터 사용가능합니다.');
    } else {
      setError('');
      setUsePoint(point);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAllPointUseEvent = () => {
    setValue(availablePoint.toString());
    setUsePoint(availablePoint);
    setError('');
  };
  return (
    <>
      <S.Title>할인 적용</S.Title>
      <S.Description>100P부터 사용 가능하며, 10P 단위로 사용할 수 있습니다.</S.Description>
      <S.Wrap>
        <S.InputWrap>
          <S.Label htmlFor="point">포인트</S.Label>
          <S.Input
            id="point"
            type="number"
            placeholder="포인트를 입력해주세요"
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <S.Unit>P</S.Unit>
          <S.Line $isFocus={isFocus} $isError={!!error} />
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.InputWrap>
        <S.TotalUseButton type="button" onClick={handleAllPointUseEvent}>
          전액 사용
        </S.TotalUseButton>
      </S.Wrap>
      <S.PointBox>
        <S.TotalPoint>
          보유 포인트
          <em>{totalPoint}P</em>
        </S.TotalPoint>
        <S.PossiblePoint>
          사용가능 포인트
          <em>{totalPoint > 100 ? Math.floor(totalPoint / 10) * 10 : 0}P</em>
        </S.PossiblePoint>
      </S.PointBox>
    </>
  );
}

const S = {
  Title: styled.span`
    display: inline-block;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 0.8rem;
  `,
  Description: styled.p`
    color: #8b8d94;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 500;
    line-height: 0%;
    margin-bottom: 2.4rem;
  `,
  Wrap: styled.div`
    display: flex;
    gap: 2.5rem;
    align-items: center;
  `,
  InputWrap: styled.div`
    padding-bottom: 0.5rem;
    flex: 1;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 0.8rem;
  `,
  Line: styled.div<{ $isFocus: boolean; $isError: boolean }>`
    position: absolute;
    width: 100%;
    height: 1px;
    background: ${({ $isError }) => ($isError ? 'red' : '#d0d0d0')};
    bottom: 0;
    &::before {
      content: '';
      height: 1px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      transition: width 0.2s ease-in-out;
      background: ${({ $isError }) => ($isError ? 'red' : '#5dc26d')};
      width: ${({ $isFocus }) => ($isFocus ? `100%` : 0)};
    }
  `,
  ErrorMessage: styled.span`
    color: red;
    font-size: 1.2rem;
    position: absolute;
    bottom: -2rem;
  `,
  TotalUseButton: styled.button`
    padding: 0.6rem 0.8rem;
    border: 1px solid #5dc26d;
    border-radius: 4px;
    color: #5dc26d;
  `,
  Label: styled.label`
    font-size: 1.6rem;
    line-height: normal;
    font-style: normal;
    font-weight: 500;
  `,
  Input: styled.input`
    border: none;
    outline: none;
    caret-color: #5dc26d;
    text-align: right;
    flex: 1;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      appearance: none;
    }
  `,
  Unit: styled.span`
    font-size: 1.6rem;
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
  `,
  TotalPoint: styled.span`
    display: inline-flex;
    gap: 0.8rem;
    font-size: 1.3rem;
    color: #8b8d94;

    font-weight: 500;
  `,
  PossiblePoint: styled.span`
    display: inline-flex;
    gap: 0.8rem;
    font-size: 1.3rem;
    color: #5dc26d;
    font-weight: 500;
  `,
  PointBox: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1.6rem;
    padding-right: 8.5rem;
  `,
};
