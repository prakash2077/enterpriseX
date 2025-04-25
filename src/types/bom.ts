
export type BOMComponent = {
  id: string;
  productId: string;
  quantity: number;
};

export type BOM = {
  id: string;
  productId: string;
  active: boolean;
  components: BOMComponent[];
  version: string;
  notes?: string;
};
