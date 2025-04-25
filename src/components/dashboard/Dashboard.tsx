
import React from 'react';
import { Package, LayoutList, Plus } from 'lucide-react';
import StatCard from './StatCard';
import QuickAction from './QuickAction';

interface DashboardProps {
  totalProducts: number;
  totalBoms: number;
  activeProducts: number;
  activeBoms: number;
  onCreateProduct: () => void;
  onCreateBom: () => void;
}

const Dashboard = ({
  totalProducts,
  totalBoms,
  activeProducts,
  activeBoms,
  onCreateProduct,
  onCreateBom
}: DashboardProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={<Package className="text-erp-primary" size={24} />}
          change="12% from last month"
          isPositive={true}
        />
        <StatCard
          title="Active Products"
          value={activeProducts}
          icon={<Package className="text-status-active" size={24} />}
          change="8% from last month"
          isPositive={true}
        />
        <StatCard
          title="Total BOMs"
          value={totalBoms}
          icon={<LayoutList className="text-erp-primary" size={24} />}
          change="5% from last month"
          isPositive={true}
        />
        <StatCard
          title="Active BOMs"
          value={activeBoms}
          icon={<LayoutList className="text-status-active" size={24} />}
          change="3% from last month"
          isPositive={true}
        />
      </div>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <QuickAction
          title="Create New Product"
          description="Add a new product to your inventory."
          icon={<Plus className="text-erp-primary" size={24} />}
          onClick={onCreateProduct}
        />
        <QuickAction
          title="Create New BOM"
          description="Create a bill of materials for your products."
          icon={<LayoutList className="text-erp-primary" size={24} />}
          onClick={onCreateBom}
        />
        <QuickAction
          title="Manage Inventory"
          description="View and manage your current inventory."
          icon={<Package className="text-erp-primary" size={24} />}
          onClick={() => {}}
        />
      </div>
      
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center gap-3 pb-3 border-b">
              <div className="w-2 h-2 bg-erp-primary rounded-full"></div>
              <div>
                <p className="text-sm font-medium">
                  {i === 0 ? 'Product A updated' : i === 1 ? 'BOM for Product B created' : 'Product C created'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {i === 0 ? '2 hours ago' : i === 1 ? '4 hours ago' : 'Yesterday'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
