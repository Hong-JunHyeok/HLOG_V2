import { Dispatch, useState } from 'react';

type ReturnTypes = [
  boolean, 
  () => void, 
  () => void,
  () => void
];

const useToggle = (initialState: boolean = false): ReturnTypes => {
  const [state, setState] = useState<boolean>(false);

  const toggleState = () => {
    setState(prev => !prev)
  };

  const toggleOpen = () => setState(true)
  const toggleClose = () => setState(false)

  return [state, toggleState, toggleOpen, toggleClose];
}

export default useToggle;
