import { Tooltip } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

const TooltipWithIcon = ({ children, title }: Props) => {
  return (
    <Tooltip title={title}>
      <div className="w-10 p-2.5 h-10 rounded-full bg-purple-500 border-2 flex items-center justify-center">
        {children}
      </div>
    </Tooltip>
  );
};
export default React.forwardRef(TooltipWithIcon);
