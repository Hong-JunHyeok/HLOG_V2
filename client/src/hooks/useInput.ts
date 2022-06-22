import {
  useState,
  useCallback,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from 'react';

const useInput = (
  initialValue = '',
  options?: {
    logging?: boolean;
    onlyEng?: boolean;
  },
): [
  string,
  ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  Dispatch<SetStateAction<string>>,
] => {
  const [inputValue, setInputValue] = useState(initialValue);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      let { value } = event.target;

      if (options) {
        if (options.logging) {
          // eslint-disable-next-line
          console.dir(value);
        }
        if (options.onlyEng) {
          value = value.replace(/[^a-zA-Z]/gi, '');
        }
      }

      setInputValue(value);
    },
    [options],
  );

  return [inputValue, onChange, setInputValue];
};

export default useInput;
