import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import './global.css';

const RootLayout = ({ children }: PropsWithChildren) => {
  return <main>{children || <Outlet />}</main>;
};

export default RootLayout;
