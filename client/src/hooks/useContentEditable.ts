import {
  ChangeEvent, useCallback, useEffect, useRef, useState,
} from 'react';

const useContentEditable = <T>(initialValue: string) => {
  const contentEditableRef = useRef<T>();
  const [content, $setContent] = useState(initialValue);

  const onInput = (event: ChangeEvent<HTMLDivElement>) => {
    $setContent(event.target.textContent);
  };

  const setContent = useCallback((newContent: string) => {
    if (contentEditableRef.current) {
      // @ts-ignore
      contentEditableRef.current.textContent = newContent;
    }
  }, []);

  useEffect(() => {
    setContent(initialValue);
  }, [setContent, initialValue]);

  return {
    content,
    setContent,
    onInput,
    contentEditableRef,
  };
};

export default useContentEditable;
