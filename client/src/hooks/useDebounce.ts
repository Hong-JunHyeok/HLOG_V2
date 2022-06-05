import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay = 200) => {
  const [debounceValue, setDebounceValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => { clearTimeout(handler); };
  }, [delay, value]);

  return debounceValue;
};

export default useDebounce;
