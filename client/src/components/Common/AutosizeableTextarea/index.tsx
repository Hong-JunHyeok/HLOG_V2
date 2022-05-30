import React from 'react';

interface PropTypes {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  id?: string;
}

const AutosizeableTextarea: React.FunctionComponent<PropTypes> = ({
  placeholder = '',
  className = '',
  value,
  onChange,
  id,
}) => {
  const textAreaRef = React.useRef<null | HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textAreaRef) {
      const { current: textareaEl } = textAreaRef;
      textareaEl.style.height = 'auto';
      const height = textareaEl.scrollHeight;
      textareaEl.style.height = `${height}px`;
    }
  }, [value, textAreaRef]);

  return (
    <textarea
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      style={{
        resize: 'none',
      }}
      id={id}
      ref={textAreaRef}
    />
  );
};

export default AutosizeableTextarea;
