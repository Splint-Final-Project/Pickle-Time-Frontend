import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

import { useOutsideClick, useEscapePress } from '@/hooks/useModalHook';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import CloseIcon from '@/assets/icons/CloseIcon';

export default function BottomSheetModal() {
  const {
    active: modalState,
    handleClose: closeModal,
    component: Component,
    callback,
    message,
  } = useBottomSheetModal(state => state);

  const potal = document.getElementById('modal-root') || document.createElement('div');
  const ref = useOutsideClick<HTMLDivElement>({ callback: closeModal, modalState });
  useEscapePress({ callback: closeModal, modalState });

  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalState]);

  if (modalState && Component) {
    return createPortal(
      <S.BackLayout>
        <S.Container ref={ref}>
          <S.CloseBtn onClick={closeModal}>
            <CloseIcon />
          </S.CloseBtn>
          {/* <S.DragBarWrap>
            <S.DragBar />
          </S.DragBarWrap> */}
          <Component handleClose={closeModal} callback={callback} message={message} />
        </S.Container>
      </S.BackLayout>,
      potal,
    );
  }
  return null;
}

const S = {
  BackLayout: styled.div`
    display: flex;
    justify-content: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;

    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
  `,

  Container: styled.div`
    position: absolute;
    bottom: 0;
    padding: 2rem 3.4rem;
    width: 100%;
    max-width: 60rem;
    background: ${({ theme }) => theme.color.white};
    border-radius: 1.6rem 1.6rem 0 0;

    @keyframes open {
      0% {
        transform: translateY(100vh);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
    animation: open 0.2s forwards;
  `,

  CloseBtn: styled.button`
    position: absolute;
    top: 2rem;
    left: 1.6rem;
  `,
  DragBarWrap: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 0.8rem;
  `,
  DragBar: styled.span`
    display: inline-block;
    width: 3rem;
    height: 1rem;
    background: #c5c5c5;
    border-radius: 20px;
  `,
};
