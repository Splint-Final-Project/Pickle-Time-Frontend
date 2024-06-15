import { useEffect, useRef } from 'react';

interface useModalHookProps {
  callback: () => void;
  modalState: boolean;
}

export function useOutsideClick<T extends HTMLElement>({ callback, modalState }: useModalHookProps) {
  const targetRef = useRef<T>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (!targetRef.current?.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    if (modalState && targetRef) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [modalState]);

  return targetRef;
}

export function useEscapePress({ callback, modalState }: useModalHookProps) {
  const handleEscapePress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      callback();
    }
  };
  useEffect(() => {
    if (modalState) {
      document.addEventListener('keydown', handleEscapePress);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [modalState]);
}
