import { useCallback, useEffect } from 'react';

const useScrollEffect = (position: 'TOP' | 'BOTTOM') => {
  const scrollTop = useCallback(() => window.scrollTo({
    top: 0,
    behavior: 'auto',
  }), []);

  const scrollBottom = useCallback(() => window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'auto',
  }), []);

  useEffect(() => {
    if (position === 'TOP') scrollTop();
    else scrollBottom();
  }, [position, scrollTop, scrollBottom]);
};

export default useScrollEffect;
