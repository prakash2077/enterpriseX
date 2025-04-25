
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: string[];
  activePage: string;
  setActivePage: (page: string) => void;
}

const Layout = ({ children, title, breadcrumbs, activePage, setActivePage }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={title} breadcrumbs={breadcrumbs} />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
