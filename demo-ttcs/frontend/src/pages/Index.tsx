
import React, { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { fetchAllProducts, fetchSelectedProducts, fetchRecommendedProducts } from "@/services/productService";
import ProductGrid from "@/components/ProductGrid";
import StatusLegend from "@/components/StatusLegend";
import StatusTimer from "@/components/StatusTimer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch initial data (products and selected products)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [allProducts, selected] = await Promise.all([
          fetchAllProducts(),
          fetchSelectedProducts()
        ]);
        
        setProducts(allProducts);
        setSelectedProducts(selected);
        setIsLoading(false);
        
        // Start the countdown for recommendations
        setRemainingTime(5);
        
        toast({
          title: "Sản phẩm đã được tải lên",
          description: "Các sản phẩm được chọn được đánh dấu màu xanh lá cây",
        });
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product data",
        });
      }
    };
    
    fetchInitialData();
  }, [toast]);

  // Countdown timer and fetch recommendations
  useEffect(() => {
    if (remainingTime === null || remainingTime <= 0) return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [remainingTime]);

  // Fetch recommendations when timer hits 0
  useEffect(() => {
    if (remainingTime === 0) {
      const getRecommendations = async () => {
        try {
          const recommended = await fetchRecommendedProducts();
          setRecommendedProducts(recommended);
          setShowRecommendations(true);
          
          const matchCount = recommended.filter(id => selectedProducts.includes(id)).length;
          console.log(matchCount)
          
          toast({
            title: "Sản phẩm đề xuất đã được tải lên",
            description: `${matchCount} sản phẩm được chọn đã được đề xuất bởi hệ thống`,
          });
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load recommendations",
          });
        }
      };
      
      getRecommendations();
    }
  }, [remainingTime, selectedProducts, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Hệ thống khuyến nghị sản phẩm</h1>
        <p className="text-gray-600 mb-6">
        Trực quan hóa các lựa chọn người dùng và đề xuất hệ thống
        </p>
        <StatusTimer 
          remainingTime={remainingTime} 
          showRecommendations={showRecommendations} 
        />
        <StatusLegend showRecommendations={showRecommendations} />
      </header>
      
      <ProductGrid
        products={products}
        selectedProducts={selectedProducts}
        recommendedProducts={recommendedProducts}
        showRecommendations={showRecommendations}
      />
    </div>
  );
};

export default Index;
