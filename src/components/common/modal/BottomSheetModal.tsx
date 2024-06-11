import { useOutsideClick, useEscapePress } from '@/hooks/useModalHook';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function BottomSheetModal() {
  const { active: modalState, handleClose: closeModal, component: Component } = useBottomSheetModal(state => state);

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
          <S.DragBarWrap>
            <S.DragBar />
          </S.DragBarWrap>
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
