import * as React from 'react';
import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header /> 
      <main>{children}</main> 
    </div>
  );
};

export default Layout;