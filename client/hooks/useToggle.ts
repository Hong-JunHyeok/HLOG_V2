import React, { MouseEventHandler } from "react";
import { useCallback, useState } from "react";

const useToggle = <T = boolean>(
  initialState = false
): [
  boolean,
  MouseEventHandler<any>,
  () => void,
  () => void,
  React.Dispatch<React.SetStateAction<T | boolean>>
] => {
  const [isToggle, setIsToggle] = useState<boolean>(initialState);

  const handleToggleOpen = useCallback(() => {
    setIsToggle(true);
  }, [setIsToggle]);
  const handleToggleClose = useCallback(() => {
    setIsToggle(false);
  }, [setIsToggle]);

  const handleToggleState = useCallback(() => {
    setIsToggle((prev) => !prev);
  }, [setIsToggle]);

  return [
    isToggle,
    handleToggleState,
    handleToggleOpen,
    handleToggleClose,
    setIsToggle,
  ];
};

export default useToggle;
