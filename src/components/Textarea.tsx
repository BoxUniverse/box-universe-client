import React, { useEffect, useRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  onEnter: (value: string) => void;
  value: string;

  width: Width;
  height: Height;
  border: Color;
}
const Textarea = ({ onEnter, value, border, width, height, ...props }: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleOnChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    inputRef.current.value = e.target.value;
  };

  const handleOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (onEnter) {
      if (e.key === 'Enter') {
        onEnter(inputRef.current.value);
      }
    }
  };

  useEffect(() => {
    inputRef.current.value = value;
  });
  return (
    <textarea
      className={`w-full bg-transparent outline-none resize-none border border-purple-500 rounded text-white pl-3 pt-3 border-${border}-500 ${width} ${height} `}
      onKeyUp={handleOnEnter}
      ref={inputRef}
      onChange={handleOnChangeTextarea}
      {...props}></textarea>
  );
};
export default Textarea;
