
import React, { useState } from 'react';
import { Search, Package, Plus, LayoutList, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import BomForm from './BomForm';
import { BOM } from '@/types/bom';
import { Product } from '@/types/product';
import BomTree from './BomTree';
import { useToast } from '@/hooks/use-toast';

interface BomListProps {
  boms: BOM[];
  products: Product[];
  onUpdateBom: (bom: BOM) => void;
  onCreateBom: (bom: BOM) => void;
  onDeleteBom: (id: string) => void;
  selectedProductId?: string;
}

const BomList = ({ 
  boms, 
  products,
  onUpdateBom, 
  onCreateBom,
  onDeleteBom,
  selectedProductId
}: BomListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBom, setEditingBom] = useState<BOM | undefined>(undefined);
  const [selectedBom, setSelectedBom] = useState<BOM | undefined>(
    selectedProductId 
      ? boms.find(b => b.productId === selectedProductId)
      : undefined
  );
  const { toast } = useToast();

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  const filteredBoms = selectedProductId
    ? boms.filter(bom => bom.productId === selectedProductId)
    : boms.filter(bom => {
        const productName = getProductName(bom.productId).toLowerCase();
        return productName.includes(searchQuery.toLowerCase()) ||
               bom.version.toLowerCase().includes(searchQuery.toLowerCase());
      });

  const handleEdit = (bom: BOM) => {
    setEditingBom(bom);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    onDeleteBom(id);
    if (selectedBom?.id === id) {
      setSelectedBom(undefined);
    }
    toast({
      title: "BOM deleted",
      description: "The Bill of Materials has been deleted successfully."
    });
  };

  const handleSubmit = (bom: BOM) => {
    if (editingBom) {
      onUpdateBom(bom);
      if (selectedBom?.id === bom.id) {
        setSelectedBom(bom);
      }
      toast({
        title: "BOM updated",
        description: "The Bill of Materials has been updated successfully."
      });
    } else {
      onCreateBom(bom);
      toast({
        title: "BOM created",
        description: "The new Bill of Materials has been created successfully."
      });
    }
    setEditingBom(undefined);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {!selectedBom ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search BOMs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              className="bg-erp-primary hover:bg-erp-secondary"
              onClick={() => {
                setEditingBom(undefined);
                setDialogOpen(true);
              }}
            >
              <Plus className="mr-1 h-4 w-4" /> New BOM
            </Button>
          </div>
          
          {filteredBoms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="bg-erp-light p-4 rounded-full mb-4">
                <LayoutList size={32} className="text-erp-primary" />
              </div>
              <h3 className="text-lg font-medium">No BOMs found</h3>
              <p className="text-muted-foreground mt-1 mb-4 max-w-md">
                {selectedProductId 
                  ? "There is no Bill of Materials defined for this product yet."
                  : "There are no Bills of Materials matching your search criteria. Try adjusting your search or create a new BOM."
                }
              </p>
              <Button 
                className="bg-erp-primary hover:bg-erp-secondary"
                onClick={() => {
                  setEditingBom(undefined);
                  setDialogOpen(true);
                }}
              >
                <Plus className="mr-1 h-4 w-4" /> Create BOM
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBoms.map((bom) => (
                <div 
                  key={bom.id}
                  className="bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => setSelectedBom(bom)}
                >
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-erp-light">
                          <LayoutList size={16} className="text-erp-primary" />
                        </div>
                        <Badge 
                          variant={bom.active ? "default" : "outline"}
                          className={bom.active 
                            ? "bg-status-active hover:bg-status-active" 
                            : "text-status-inactive"}
                        >
                          {bom.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">v{bom.version}</span>
                    </div>
                    <h3 className="font-semibold mt-2">{getProductName(bom.productId)}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {bom.components.length} components
                    </p>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(bom);
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(bom.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedBom(undefined)}
            >
              Back to BOM List
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleEdit(selectedBom)}
              >
                Edit BOM
              </Button>
              
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDelete(selectedBom.id)}
              >
                Delete
              </Button>
            </div>
          </div>
          
          <BomTree bom={selectedBom} products={products} />
        </div>
      )}
      
      <BomForm 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        products={products}
        bom={editingBom}
      />
    </div>
  );
};

export default BomList;
