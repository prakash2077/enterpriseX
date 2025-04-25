
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import ProductList from '@/components/products/ProductList';
import BomList from '@/components/bom/BomList';
import { Product } from '@/types/product';
import { BOM } from '@/types/bom';

// Initial mock data
const initialProducts: Product[] = [
  {
    id: "p1",
    name: "Table Top",
    type: "Finished",
    uom: "Units",
    active: true,
    description: "Wooden table top, ready to assemble"
  },
  {
    id: "p2",
    name: "Table Leg",
    type: "Raw",
    uom: "Units",
    active: true,
    description: "Wooden table leg component"
  },
  {
    id: "p3",
    name: "Screw 8mm",
    type: "Raw",
    uom: "Units",
    active: true,
    description: "8mm metal screws for assembly"
  },
  {
    id: "p4",
    name: "Wood Glue",
    type: "Raw",
    uom: "Liter",
    active: true,
    description: "Industrial wood glue for assembly"
  },
  {
    id: "p5",
    name: "Office Chair",
    type: "Finished",
    uom: "Units",
    active: true,
    description: "Ergonomic office chair"
  },
  {
    id: "p6",
    name: "Aluminum Frame",
    type: "Raw",
    uom: "Units",
    active: false,
    description: "Aluminum frame for chair structure"
  }
];

const initialBoms: BOM[] = [
  {
    id: "b1",
    productId: "p1",
    active: true,
    components: [
      {
        id: "c1",
        productId: "p2",
        quantity: 4
      },
      {
        id: "c2",
        productId: "p3",
        quantity: 16
      },
      {
        id: "c3",
        productId: "p4",
        quantity: 0.25
      }
    ],
    version: "1.0",
    notes: "Standard table top assembly"
  },
  {
    id: "b2",
    productId: "p5",
    active: true,
    components: [
      {
        id: "c4",
        productId: "p6",
        quantity: 1
      },
      {
        id: "c5",
        productId: "p3",
        quantity: 12
      }
    ],
    version: "2.1",
    notes: "Updated office chair assembly"
  }
];

const Index = () => {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [boms, setBoms] = useState<BOM[]>(initialBoms);
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
  
  // Product Management
  const handleCreateProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    
    // Also delete any BOMs that use this product
    setBoms(boms.filter(b => 
      b.productId !== id && !b.components.some(c => c.productId === id)
    ));
  };
  
  // BOM Management
  const handleCreateBom = (bom: BOM) => {
    setBoms([...boms, bom]);
  };

  const handleUpdateBom = (updatedBom: BOM) => {
    setBoms(boms.map(b => 
      b.id === updatedBom.id ? updatedBom : b
    ));
  };

  const handleDeleteBom = (id: string) => {
    setBoms(boms.filter(b => b.id !== id));
  };

  const handleViewBom = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('bom');
  };

  // Get page title and breadcrumbs based on active page
  const getPageInfo = () => {
    switch (activePage) {
      case 'dashboard':
        return { title: 'Dashboard', breadcrumbs: [] };
      case 'products':
        return { title: 'Products', breadcrumbs: ['Inventory', 'Products'] };
      case 'bom':
        return { 
          title: 'Bills of Materials', 
          breadcrumbs: ['Manufacturing', 'Bills of Materials'] 
        };
      case 'settings':
        return { title: 'Settings', breadcrumbs: [] };
      default:
        return { title: 'Dashboard', breadcrumbs: [] };
    }
  };

  // Render active page content
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard 
            totalProducts={products.length}
            totalBoms={boms.length}
            activeProducts={products.filter(p => p.active).length}
            activeBoms={boms.filter(b => b.active).length}
            onCreateProduct={() => setActivePage('products')}
            onCreateBom={() => setActivePage('bom')}
          />
        );
      case 'products':
        return (
          <ProductList 
            products={products}
            onUpdateProduct={handleUpdateProduct}
            onCreateProduct={handleCreateProduct}
            onDeleteProduct={handleDeleteProduct}
            onViewBom={handleViewBom}
          />
        );
      case 'bom':
        return (
          <BomList 
            boms={boms}
            products={products}
            onUpdateBom={handleUpdateBom}
            onCreateBom={handleCreateBom}
            onDeleteBom={handleDeleteBom}
            selectedProductId={selectedProductId}
          />
        );
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-muted-foreground">
              Settings page is not implemented in this demo.
            </p>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  const { title, breadcrumbs } = getPageInfo();

  return (
    <Layout 
      title={title} 
      breadcrumbs={breadcrumbs}
      activePage={activePage}
      setActivePage={(page) => {
        setActivePage(page);
        if (page !== 'bom') {
          setSelectedProductId(undefined);
        }
      }}
    >
      {renderPage()}
    </Layout>
  );
};

export default Index;
