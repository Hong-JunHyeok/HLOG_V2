import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      return localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      return error;
    }
  };

  const remove = () => {
    localStorage.removeItem(key);
  };

  return { storedValue, setValue, remove };
};

export default useLocalStorage;
