import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

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
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100000;
    position: fixed;
    top: 0;
    left: 0;
  `,
  Container: styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 1.6rem;
    background: #fff;
    border-top-right-radius: 1.6rem;
    border-top-left-radius: 1.6rem;

    @keyframes open {
      0% {
        height: 0;
        opacity: 0;
      }
      100% {
        height: 50rem;
        opacity: 1;
      }
    }
    animation: open 0.2s forwards;
  `,
  CloseBtn: styled.button`
    position: absolute;
    top: 0.8rem;
    left: 0.8rem;
    font-size: 1.6rem;
    font-weight: bold;
  `,
};
