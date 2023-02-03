import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const ItemSidebar = ({ children }: Props, ref: any) => <div ref={ref}>{children}</div>;

export default React.forwardRef(ItemSidebar);
