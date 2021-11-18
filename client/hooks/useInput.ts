import {
  useState,
  useCallback,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from "react";

const useInput = (
  initialValue: string = "",
  logging: boolean = false
): [
  string,
  ChangeEventHandler<HTMLInputElement>,
  Dispatch<SetStateAction<string>>
] => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = event.target;

      setValue(value);
      if (logging) {
        console.dir(value);
      }
    },
    []
  );

  return [value, onChange, setValue];
};

export default useInput;
