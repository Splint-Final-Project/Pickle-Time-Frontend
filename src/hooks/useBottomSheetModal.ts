import { useEffect } from 'react';
import useBottomSheetModalState from './zustand/useBottomSheetModalState';

export default function useBottomSheetModal({ renderComponent }: { renderComponent: any }) {
  const { handleOpen, setComponent } = useBottomSheetModalState(state => state);
  useEffect(() => {
    setComponent(renderComponent);
    return () => {
      setComponent(null);
    };
  }, [renderComponent]);

  return { handleOpen };
}
