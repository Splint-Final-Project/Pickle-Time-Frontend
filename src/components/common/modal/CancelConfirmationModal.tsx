import styled from '@emotion/styled';
import RoundButton from '../button/RoundButton';
import { ROUND_BUTTON_COLOR } from '@/constants/BUTTON';

/**
 * 재 확인용 모달
 */

interface ModalProps {
  handleClose: () => void;
}
export default function CancelConfirmationModal({ handleClose }: ModalProps) {
  return (
    <S.Container>
      <S.Message>신청을 취소하고 나가실 건가요?</S.Message>
      <S.Buttons>
        <RoundButton onClick={handleClose} color={ROUND_BUTTON_COLOR.GRAY}>
          취소
        </RoundButton>
        <RoundButton color={ROUND_BUTTON_COLOR.BLACK}>확인</RoundButton>
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
