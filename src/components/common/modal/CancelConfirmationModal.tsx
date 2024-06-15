import styled from '@emotion/styled';
import RoundButton from '@/components/common/button/RoundButton';
import { ROUND_BUTTON_COLOR } from '@/constants/BUTTON';

/**
 * 재 확인용 모달
 * - 확인버튼 누를 시 동작할 callback을 받습니다.
 * - 여러 확인용 알림에 사용할 것을 대비해 사용자에게 묻는 문구는 message로 받습니다.
 * <사용 예>
 *  <Button
        onClick={() =>
          handleOpen({
            renderComponent: CancelConfirmationModal,
            callback: handleConfirmAction,
            message: '신청을 취소하시겠습니까?',
          })
        }
      >
        취소확인모달
      </Button>
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
