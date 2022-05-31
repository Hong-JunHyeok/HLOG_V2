import { useState } from 'react';

type ReturnTypes = {
  state: boolean,
  toggleState: () => void,
  toggleOpen: () => void,
  toggleClose: () => void,
};

const useToggle = (initialState = false): ReturnTypes => {
  const [state, setState] = useState<boolean>(initialState);

  const toggleState = () => {
    setState((prev) => !prev);
  };

  const toggleOpen = () => setState(true);
  const toggleClose = () => setState(false);

  return {
    state,
    toggleState,
    toggleOpen,
    toggleClose,
  };
};

export default useToggle;
