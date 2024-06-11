import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import CloseIcon from '@/assets/icons/CloseIcon';

export default function BottomSheetModal() {
  const { active: modalState, handleClose: closeModal, component: Component } = useBottomSheetModal(state => state);

  const handleEsCapeEvent = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (modalState && Component) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsCapeEvent);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleEsCapeEvent);
    };
  }, [modalState]);

  const potal = document.getElementById('modal-root') || document.createElement('div');
  if (modalState && Component) {
    return createPortal(
      <S.BackLayout>
        <S.Container>
          <S.CloseBtn onClick={closeModal}>
            <CloseIcon />
          </S.CloseBtn>
          <Component handleClose={closeModal} />
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
    padding: 2rem 1.6rem;
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
};
