import React, { Ref, useEffect, useRef } from 'react';

function useOutsideRef(closeCallback: Function) {
  const ref = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if(ref.current && !ref.current.contains((event.target as Node))) closeCallback();
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [closeCallback]);

  return ref;
}

export default useOutsideRef;
