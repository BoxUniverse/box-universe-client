import React, { memo, ReactNode } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icons?: ReactNode;
  value: string;
  width: Width;
  height: Height;
}

const Input: React.FC<Props> = ({ icons, value, height, width, ...props }) => {
  return (
    <div className="relative">
      <input
        name="detail__email"
        id="detail__email"
        className={`will-change-scrollwhitespace-nowrap placeholder:select-none neon text-lg align-middle placeholder:text-sm placeholder:uppercase bg-transparent rounded-lg focus: outline-0  pl-10 pr-12 border-purple-500 ${width} ${height}`}
        value={value}
        {...props}
      />
      {icons}
    </div>
  );
};
export default memo(Input);
