
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Package,
  MoreVertical, 
  Pencil,
  Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductCardProps {
  id: string;
  name: string;
  type: 'Raw' | 'Finished';
  uom: string;
  active: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const ProductCard = ({ 
  id, 
  name, 
  type, 
  uom, 
  active,
  onEdit,
  onDelete,
  onView
}: ProductCardProps) => {
  return (
    <div className="erp-kanban-card p-4" onClick={() => onView(id)}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-2 rounded-md",
            type === 'Raw' ? 'bg-erp-light' : 'bg-blue-50'
          )}>
            <Package size={16} className={cn(
              type === 'Raw' ? 'text-erp-primary' : 'text-blue-500'
            )} />
          </div>
          <Badge variant={type === 'Raw' ? "outline" : "secondary"} className="text-xs">
            {type}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-md hover:bg-accent">
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}>
              <Pencil size={14} className="mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="text-destructive"
            >
              <Trash2 size={14} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h3 className="font-semibold mb-1 cursor-pointer hover:text-erp-primary transition-colors">{name}</h3>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>UOM: {uom}</span>
        <Badge variant={active ? "default" : "outline"} className={cn(
          "text-xs",
          active ? "bg-status-active hover:bg-status-active" : "text-status-inactive"
        )}>
          {active ? "Active" : "Inactive"}
        </Badge>
      </div>
    </div>
  );
};

export default ProductCard;
