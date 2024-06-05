import { RefCallback, RefObject, useEffect, useRef } from 'react';

interface UseIntersectionObservRefProps {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit;
}

const useIntersectionObservRef = <T extends HTMLElement>({
  callback,
  options = { root: null, rootMargin: '0px', threshold: 0 },
}: UseIntersectionObservRefProps): RefCallback<T> | RefObject<T> => {
  const callbackOnlyIntersecting: IntersectionObserverCallback = (entries, observer) => {
    const isIntersecting = entries.map(entry => entry.isIntersecting).reduce((acc, cur) => acc && cur, true);
    if (isIntersecting) {
      callback(entries, observer);
    }
  };
  const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(callbackOnlyIntersecting, options));
  const elementRef = useRef<T>(null);
  useEffect(() => {
    if (!elementRef.current || !observerRef.current) {
      return;
    }
    observerRef.current.observe(elementRef.current);
    return () => observerRef.current.disconnect();
  }, [elementRef, observerRef]);
  return elementRef;
};

export default useIntersectionObservRef;
