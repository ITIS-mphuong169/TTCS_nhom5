
import React from "react";
import { Product, ProductStatus } from "@/types/product";

interface ProductCardProps {
  product: Product;
  status: ProductStatus;
}

const ProductCard = ({ product, status }: ProductCardProps) => {
  const getBgColor = () => {
    switch (status) {
      case 'selected':
        return 'bg-selected border-green-500';
      case 'selected-recommended':
        return 'bg-selected-recommended border-red-600 text-white';
      case 'recommended':
        return 'bg-recommended border-purple-500 text-white';
      default:
        return 'bg-white border-gray-200';
    }
  };
  
  return (
    <div 
      className={`relative rounded-lg overflow-hidden shadow-md transition-all duration-500 ${getBgColor()}`}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-md">
          ID: {product.id}
        </div>
        <h3 className="font-medium">{product.name}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
