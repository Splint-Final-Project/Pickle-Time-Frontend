import { useCallback, useEffect, useState } from 'react';

function useScrollToTop(threshold = 200) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    window.scrollY > threshold ? setIsVisible(true) : setIsVisible(false);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  return isVisible;
}

export default useScrollToTop;
