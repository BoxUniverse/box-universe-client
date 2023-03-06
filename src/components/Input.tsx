import { Tooltip } from '@mui/material';
import React, { memo, ReactNode, useEffect, useRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icons: ReactNode;
  value: string;
  width: Width;
  height: Height;
  border: Color;
  onEnter?: (value: string) => void;
}

const Input: React.FC<Props> = ({ icons, value, height, width, border, onEnter, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputRef.current.value = e.target.value;
  };

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    <Tooltip title="Press enter to submit" open={false} arrow>
      <div className="relative w-full">
        <input
          name="detail__email"
          id="detail__email"
          ref={inputRef}
          className={`will-change-scrollwhitespace-nowrap placeholder:select-none neon text-lg align-middle placeholder:text-sm placeholder:uppercase bg-transparent rounded-lg focus: outline-0  pl-10 pr-2 border-${border}-500 ${width} ${height}`}
          onChange={handleOnChangeInput}
          {...props}
          onKeyUp={handleOnEnter}
          spellCheck={false}
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 ml-3 ">{icons}</div>
      </div>
    </Tooltip>
  );
};
export default memo(Input);
