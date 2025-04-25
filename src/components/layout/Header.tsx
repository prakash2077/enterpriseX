
import React from 'react';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  breadcrumbs?: string[];
}

const Header = ({ title, breadcrumbs = [] }: HeaderProps) => {
  return (
    <header className="border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          {breadcrumbs.length > 0 && (
            <nav className="text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <span>{crumb}</span>
                  {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-status-warning rounded-full"></span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="bg-erp-primary rounded-full p-1">
              <User size={20} className="text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
