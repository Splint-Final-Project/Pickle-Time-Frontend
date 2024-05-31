import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

const S = {
  ModalBackground: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  `,
  ModalContainer: styled.div`
    position: relative;
    padding: 3.2rem 2.8rem 2.8rem;
    border-radius: 0.8rem;
    background-color: white;
    animation: appearModal 0.5s ease-in-out;

    @keyframes appearModal {
      0% {
        opacity: 0;
        transform: translate3d(0, 3%, 0);
      }
      100% {
        opacity: 1;
        transform: translateZ(0);
      }
    }
  `,
};

interface BackDropModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

/**
 * 백드롭 모달(기본형) - 모달이 열려있는지 확인하고, 내부 내용을 표시하고, onClose 함수를 사용하여 모달을 닫습니다.
 * @component
 * @param isOpen - 모달이 열려있는지 확인
 * @param children - 모달 내부 내용
 * @param onClose - 모달을 닫을 때 사용할 함수
 *
 */

export default function BackDropModal({ isOpen, children, onClose }: BackDropModalProps) {
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <S.ModalBackground onClick={onClose}>
      <S.ModalContainer onClick={e => e.stopPropagation()}>{children}</S.ModalContainer>
    </S.ModalBackground>,
    modalRoot,
  );
}
