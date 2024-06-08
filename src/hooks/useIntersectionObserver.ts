import { RefObject, useEffect } from 'react';

/**
 * IntersectionObserver를 사용해서 요소가 화면에 나타날때 콜백함수 호출하는 커스텀 훅
 * @param {Function} callback - 화면에 요소가 나타났을 때 호출될 콜백 함수
 * @param {React.RefObject} loaderRef - 감시할 요소의 ref
 */

function useIntersectionObserver(callback: () => void, loaderRef: RefObject<Element>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 배열 구조분해로 IntersectionObserverEntry 객체 받음
        if (!entry.isIntersecting) return; // 요소가 화면에 나타나지 않았다면 그냥 리턴 해서 콜백 실행 안되도록
        callback?.(); // 콜백 함수 있다면 실행
      },
      { threshold: 0.4 }, //조정 가능
    );

    const observe = (element: Element | null) => {
      if (element) {
        observer.observe(element);
        return () => observer.unobserve(element);
      }
    };

    const unobserve = observe(loaderRef.current);
    return unobserve;
  }, [loaderRef, callback]);
}

export default useIntersectionObserver;
