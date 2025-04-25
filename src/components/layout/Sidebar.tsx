
import React from 'react';
import { 
  Box, 
  Package, 
  Home,
  LayoutList,
  Settings,
  Search,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed, activePage, setActivePage }: SidebarProps) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: <Home size={20} />,
    },
    { 
      id: 'products', 
      name: 'Products', 
      icon: <Package size={20} />,
    },
    { 
      id: 'bom', 
      name: 'Bill of Materials', 
      icon: <LayoutList size={20} />,
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: <Settings size={20} />,
    }
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar h-screen z-30 transition-all duration-300 flex flex-col shadow-md",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Box className="text-erp-primary" size={24} />
            <span className="font-bold text-sidebar-foreground text-xl">Odoo UI</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Menu size={20} />
        </Button>
      </div>
      
      <div className="py-4">
        <div className={cn(
          "mx-3 mb-4 rounded-md bg-sidebar-accent flex items-center",
          isCollapsed ? "justify-center p-2" : "px-3 py-2"
        )}>
          <Search className="text-sidebar-foreground" size={16} />
          {!isCollapsed && (
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-0 focus:outline-none text-sidebar-foreground text-sm w-full px-2"
            />
          )}
        </div>
        
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={cn(
                "erp-sidebar-item w-full",
                activePage === item.id && "active",
                isCollapsed && "justify-center"
              )}
            >
              <span className="text-current">{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
