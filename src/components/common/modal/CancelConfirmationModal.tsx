import styled from '@emotion/styled';
import RoundButton from '../button/RoundButton';
import { ROUND_BUTTON_COLOR } from '@/constants/BUTTON';

/**
 * 재 확인용 모달
 */

interface ModalProps {
  handleClose: () => void;
  callback: () => void;
  message?: string;
}
export default function CancelConfirmationModal({ handleClose, callback, message }: ModalProps) {
  const handleConfirmClick = () => {
    callback();
    handleClose();
  };

  return (
    <S.Container>
      <S.Message>{message}</S.Message>
      <S.Buttons>
        <RoundButton onClick={handleClose} color={ROUND_BUTTON_COLOR.GRAY}>
          취소
        </RoundButton>
        <RoundButton onClick={handleConfirmClick} color={ROUND_BUTTON_COLOR.BLACK}>
          확인
        </RoundButton>
      </S.Buttons>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    padding: 2.2rem 0 1.8rem;
    text-align: center;
  `,

  Message: styled.span`
    color: ${({ theme }) => theme.color.basic};
    ${({ theme }) => theme.typography.subTitle2};
  `,

  Buttons: styled.div`
    display: flex;
    gap: 1.2rem;
    margin-top: 4.3rem;
  `,
};
