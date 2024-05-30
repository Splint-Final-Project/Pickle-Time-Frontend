import React, { useCallback, useEffect } from 'react';

interface useClickOutsideProps {
  selectRef: React.RefObject<HTMLDivElement>;
  optionsRef: React.RefObject<HTMLUListElement>;
  callback: () => void;
}

export default function useCloseDropdown({ selectRef, optionsRef, callback }: useClickOutsideProps) {
  const handleCheckClickPosition = (e: MouseEvent) => {
    if (!optionsRef?.current?.contains(e.target as Node) && !selectRef?.current?.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleCheckClickPosition);
    return () => document.removeEventListener('click', handleCheckClickPosition);
  }, [selectRef, optionsRef]);
}
