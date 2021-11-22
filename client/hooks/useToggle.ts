import React, { MouseEventHandler } from "react";
import { useCallback, useState } from "react";

const useToggle = <T = boolean>(
  initialState = false
): [
  boolean,
  MouseEventHandler<HTMLDivElement>,
  React.Dispatch<React.SetStateAction<T | boolean>>
] => {
  const [isToggle, setIsToggle] = useState<boolean>(initialState);

  const handleToggleState = useCallback(() => {
    setIsToggle((prev) => !prev);
  }, [setIsToggle]);

  return [isToggle, handleToggleState, setIsToggle];
};

export default useToggle;
