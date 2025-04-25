
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const QuickAction = ({ 
  title, 
  description, 
  icon, 
  onClick,
  className 
}: QuickActionProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg p-5 shadow-sm border border-border", 
      className
    )}>
      <div className="flex items-center gap-4">
        <div className="bg-erp-light p-3 rounded-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button 
        onClick={onClick}
        className="w-full mt-4 bg-erp-primary hover:bg-erp-secondary"
      >
        Get Started
      </Button>
    </div>
  );
};

export default QuickAction;
