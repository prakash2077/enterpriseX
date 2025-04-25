
import React from 'react';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/types/product';

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (product: Product) => void;
  product?: Product;
}

const ProductForm = ({ 
  open, 
  onOpenChange, 
  onSubmit,
  product 
}: ProductFormProps) => {
  const isEdit = !!product;

  const [formData, setFormData] = React.useState<Product>({
    id: product?.id || crypto.randomUUID(),
    name: product?.name || '',
    type: product?.type || 'Raw',
    uom: product?.uom || 'Units',
    active: product?.active ?? true,
    description: product?.description || ''
  });
  
  const handleChange = (
    field: keyof Product, 
    value: string | boolean | 'Raw' | 'Finished'
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Product' : 'Create New Product'}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="settings">Additional Settings</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter product name" 
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => handleChange('type', value as 'Raw' | 'Finished')}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Raw">Raw Material</SelectItem>
                        <SelectItem value="Finished">Finished Product</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="uom">Unit of Measure</Label>
                    <Select 
                      value={formData.uom} 
                      onValueChange={(value) => handleChange('uom', value)}
                    >
                      <SelectTrigger id="uom">
                        <SelectValue placeholder="Select UOM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Units">Units</SelectItem>
                        <SelectItem value="Kg">Kg</SelectItem>
                        <SelectItem value="Liter">Liter</SelectItem>
                        <SelectItem value="Meter">Meter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea 
                    id="description" 
                    className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="active">Active Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Products marked as inactive will not appear in searches
                    </p>
                  </div>
                  <Switch 
                    id="active" 
                    checked={formData.active}
                    onCheckedChange={(checked) => handleChange('active', checked)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-erp-primary hover:bg-erp-secondary">
                {isEdit ? 'Update Product' : 'Create Product'}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
