import React from 'react';

interface PropTypes {
  placeholder?: string;  
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const AutosizeableTextarea: React.FunctionComponent<PropTypes> = (props) => {
  const textAreaRef = React.useRef<null | HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if(textAreaRef) {
      const { current: textareaEl } = textAreaRef;
      textareaEl.style.height = 'auto';
      let height = textareaEl.scrollHeight;
      textareaEl.style.height = `${height}px`;
    }
  }, [props.value, textAreaRef]);

  return <textarea {...props} ref={textAreaRef}></textarea>
}

export default AutosizeableTextarea;
