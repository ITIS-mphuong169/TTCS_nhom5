
import React from "react";
import ProductCard from "./ProductCard";
import { Product, ProductStatus } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  selectedProducts: string[];
  recommendedProducts: string[];
  showRecommendations: boolean;
}

const ProductGrid = ({ 
  products, 
  selectedProducts, 
  recommendedProducts, 
  showRecommendations 
}: ProductGridProps) => {
  const getProductStatus = (productId: string): ProductStatus => {
    const isSelected = selectedProducts.includes(productId);
    const isRecommended = recommendedProducts.includes(productId);
    
    if (showRecommendations) {
      if (isSelected && isRecommended) {
        return 'selected-recommended';
      } else if (isRecommended) {
        return 'recommended';
      } else if (isSelected) {
        return 'selected';
      }
    } else {
      if (isSelected) {
        return 'selected';
      }
    }
    
    return 'normal';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
      {products.map((product) => (
        <div key={product.id} className="animate-fade-in">
          <ProductCard 
            product={product} 
            status={getProductStatus(product.id)} 
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
