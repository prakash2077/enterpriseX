
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2 } from 'lucide-react';
import { BOM, BOMComponent } from '@/types/bom';
import { Product } from '@/types/product';

interface BomFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (bom: BOM) => void;
  products: Product[];
  bom?: BOM;
}

const BomForm = ({ 
  open, 
  onOpenChange, 
  onSubmit,
  products,
  bom 
}: BomFormProps) => {
  const isEdit = !!bom;
  const finishedProducts = products.filter(p => p.type === 'Finished');
  const rawMaterials = products.filter(p => p.type === 'Raw');

  const [formData, setFormData] = useState<BOM>({
    id: bom?.id || crypto.randomUUID(),
    productId: bom?.productId || '',
    active: bom?.active ?? true,
    components: bom?.components || [],
    version: bom?.version || '1.0',
    notes: bom?.notes || ''
  });
  
  const handleChange = (field: keyof BOM, value: string | boolean | BOMComponent[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addComponent = () => {
    if (rawMaterials.length === 0) return;
    
    const newComponent: BOMComponent = {
      id: crypto.randomUUID(),
      productId: rawMaterials[0].id,
      quantity: 1,
    };
    
    handleChange('components', [...formData.components, newComponent]);
  };

  const updateComponent = (id: string, field: keyof BOMComponent, value: any) => {
    const updatedComponents = formData.components.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    );
    
    handleChange('components', updatedComponents);
  };

  const removeComponent = (id: string) => {
    const updatedComponents = formData.components.filter(comp => comp.id !== id);
    handleChange('components', updatedComponents);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  const getProductById = (id: string) => products.find(p => p.id === id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Bill of Materials' : 'Create New Bill of Materials'}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="product">Product</Label>
                  <Select 
                    value={formData.productId} 
                    onValueChange={(value) => handleChange('productId', value)}
                    disabled={isEdit}
                  >
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {finishedProducts.map(product => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="version">Version</Label>
                  <Input 
                    id="version" 
                    value={formData.version}
                    onChange={(e) => handleChange('version', e.target.value)}
                    placeholder="e.g. 1.0" 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="active">Active Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Inactive BOMs won't be used in production
                    </p>
                  </div>
                  <Switch 
                    id="active" 
                    checked={formData.active}
                    onCheckedChange={(checked) => handleChange('active', checked)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea 
                    id="notes" 
                    className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Additional notes..."
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="components" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Component List</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addComponent}
                    className="flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Component
                  </Button>
                </div>
                
                {formData.components.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    No components added yet. Click 'Add Component' to start building your BOM.
                  </p>
                ) : (
                  <div className="border rounded-md divide-y">
                    <div className="grid grid-cols-[1fr,90px,60px] p-2 bg-muted font-medium text-sm">
                      <div>Component</div>
                      <div className="text-center">Quantity</div>
                      <div></div>
                    </div>
                    {formData.components.map(component => (
                      <div key={component.id} className="grid grid-cols-[1fr,90px,60px] p-2 items-center">
                        <Select 
                          value={component.productId} 
                          onValueChange={(value) => updateComponent(component.id, 'productId', value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Select component" />
                          </SelectTrigger>
                          <SelectContent>
                            {rawMaterials.map(product => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="px-1">
                          <Input 
                            type="number" 
                            min="0.01"
                            step="0.01"
                            value={component.quantity}
                            onChange={(e) => updateComponent(
                              component.id, 
                              'quantity', 
                              parseFloat(e.target.value) || 0
                            )}
                            className="h-8"
                          />
                        </div>
                        <div className="flex justify-center">
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeComponent(component.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-erp-primary hover:bg-erp-secondary"
                disabled={!formData.productId || formData.components.length === 0}
              >
                {isEdit ? 'Update BOM' : 'Create BOM'}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BomForm;
