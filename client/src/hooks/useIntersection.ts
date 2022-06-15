import { useRef, useEffect } from 'react';

const useIntersection = (
  callback: () => void,
  options?: {
    setting?: IntersectionObserverInit
    disable?: boolean
  },
) => {
  const target = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((
      entries,
    ) => {
      entries.forEach((entry) => entry.isIntersecting && callback());
    }, options?.setting);
    observer.observe(target.current);

    if (options?.disable) { observer.unobserve(target.current); }

    return () => observer.disconnect();
  }, [target, callback, options]);

  return target;
};

export default useIntersection;
