
import React from 'react';
import { Package } from 'lucide-react';
import { BOM, BOMComponent } from '@/types/bom';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface BomTreeProps {
  bom: BOM;
  products: Product[];
}

interface TreeItemProps {
  component: BOMComponent;
  products: Product[];
  level?: number;
}

const TreeItem = ({ component, products, level = 0 }: TreeItemProps) => {
  const product = products.find(p => p.id === component.productId);
  if (!product) return null;

  return (
    <div>
      <div className={cn(
        "flex items-center py-2 border-b",
        level > 0 && "ml-6 relative before:absolute before:top-1/2 before:-left-4 before:w-3 before:h-px before:bg-border"
      )}>
        <div className="p-1.5 rounded-md bg-erp-light mr-3">
          <Package className="text-erp-primary" size={16} />
        </div>
        <div className="flex-1">
          <div className="font-medium">{product.name}</div>
          <div className="text-xs text-muted-foreground">
            {product.type} • {product.uom}
          </div>
        </div>
        <div className="font-medium text-sm">
          {component.quantity} {product.uom}
        </div>
      </div>
    </div>
  );
};

const BomTree = ({ bom, products }: BomTreeProps) => {
  const product = products.find(p => p.id === bom.productId);
  
  if (!product) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-4">
      <div className="mb-4 pb-3 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">Version: {bom.version}</span>
              <span className="inline-flex h-2 w-2 rounded-full bg-status-active"></span>
              <span className="text-sm text-status-active">Active</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {bom.components.length} components
          </div>
        </div>
      </div>
      
      <div className="space-y-1">
        {bom.components.map(component => (
          <TreeItem 
            key={component.id} 
            component={component}
            products={products}
          />
        ))}
      </div>
    </div>
  );
};

export default BomTree;
