
export interface Product {
  id: string;
  name: string;
  imageUrl: string;
}

export type ProductStatus = 'normal' | 'selected' | 'selected-recommended' | 'recommended';
