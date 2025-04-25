
export type Product = {
  id: string;
  name: string;
  type: 'Raw' | 'Finished';
  uom: string;
  active: boolean;
  description?: string;
};
