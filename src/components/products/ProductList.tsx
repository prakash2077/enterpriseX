
import React, { useState } from 'react';
import { Search, Package, Plus, LayoutGrid, ListTree, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

interface ProductListProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onCreateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onViewBom: (productId: string) => void;
}

const ProductList = ({ 
  products, 
  onUpdateProduct, 
  onCreateProduct,
  onDeleteProduct,
  onViewBom
}: ProductListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const { toast } = useToast();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.uom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setEditingProduct(product);
      setDialogOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    onDeleteProduct(id);
    toast({
      title: "Product deleted",
      description: "The product has been deleted successfully.",
    });
  };

  const handleView = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product && product.type === 'Finished') {
      onViewBom(id);
    } else {
      toast({
        title: "No BOM Available",
        description: "Raw materials do not have Bills of Materials.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = (product: Product) => {
    if (editingProduct) {
      onUpdateProduct(product);
      toast({
        title: "Product updated",
        description: "The product has been updated successfully."
      });
    } else {
      onCreateProduct(product);
      toast({
        title: "Product created",
        description: "The new product has been created successfully."
      });
    }
    setEditingProduct(undefined);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className={`rounded-none ${viewMode === 'grid' ? 'bg-accent' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={`rounded-none ${viewMode === 'list' ? 'bg-accent' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <ListTree size={18} />
            </Button>
          </div>
          
          <Button 
            className="bg-erp-primary hover:bg-erp-secondary"
            onClick={() => {
              setEditingProduct(undefined);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-1 h-4 w-4" /> New Product
          </Button>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="bg-erp-light p-4 rounded-full mb-4">
            <Package size={32} className="text-erp-primary" />
          </div>
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-muted-foreground mt-1 mb-4 max-w-md">
            There are no products matching your search criteria. Try adjusting your search or create a new product.
          </p>
          <Button 
            className="bg-erp-primary hover:bg-erp-secondary"
            onClick={() => {
              setEditingProduct(undefined);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-1 h-4 w-4" /> Create Product
          </Button>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
          : "space-y-2"
        }>
          {filteredProducts.map((product) => (
            viewMode === 'grid' ? (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                type={product.type}
                uom={product.uom}
                active={product.active}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ) : (
              <div 
                key={product.id}
                className="flex items-center justify-between p-3 bg-white border border-border rounded-md cursor-pointer hover:bg-accent/10"
                onClick={() => handleView(product.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${product.type === 'Raw' ? 'bg-erp-light' : 'bg-blue-50'}`}>
                    <Package size={16} className={product.type === 'Raw' ? 'text-erp-primary' : 'text-blue-500'} />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>UOM: {product.uom}</span>
                      <span>•</span>
                      <span>Type: {product.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(product.id);
                  }}>
                    <span className="sr-only">Edit</span>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(product.id);
                  }}>
                    <span className="sr-only">Delete</span>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            )
          ))}
        </div>
      )}
      
      <ProductForm 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        product={editingProduct}
      />
    </div>
  );
};

export default ProductList;
