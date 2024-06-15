import styled from '@emotion/styled';
import RoundButton from '@/components/common/button/RoundButton';
import { ROUND_BUTTON_COLOR } from '@/constants/BUTTON';
import usePickleCreation from '@/hooks/zustand/usePickleCreation';

interface ModalProps {
  handleClose: () => void;
  callback: () => void;
}

export default function KeepCreatingModal({ handleClose, callback }: ModalProps) {
  const { setStep, clear, title } = usePickleCreation();
  return (
    <S.Container>
      <S.Message>{`생성중인 피클이 있습니다${title ? ': ' + title : '.'}`}</S.Message>
      <S.Buttons>
        <RoundButton
          onClick={() => {
            setStep(0);
            clear();
            handleClose();
            callback();
          }}
          color={ROUND_BUTTON_COLOR.GRAY}
        >
          처음부터 만들기
        </RoundButton>
        <RoundButton
          onClick={() => {
            callback();
            handleClose();
          }}
          color={ROUND_BUTTON_COLOR.BLACK}
        >
          이어서 만들기
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
