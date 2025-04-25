
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  isPositive?: boolean;
  className?: string;
}

const StatCard = ({ title, value, icon, change, isPositive = true, className }: StatCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg p-4 shadow-sm", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className={cn(
              "text-xs mt-1",
              isPositive ? "text-status-active" : "text-status-warning"
            )}>
              {isPositive ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className="bg-erp-light p-2 rounded-md">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
