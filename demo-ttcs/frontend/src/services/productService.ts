
import { Product } from "@/types/product";
import Papa from "papaparse";


export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch('/suggest.csv');
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<Product>(csvText, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        const products: Product[] = result.data.map((row: any[]) => ({
          id: row[0]?.toString().trim() ?? '',
          name: parseInt(row[1]) || 0,
          imageUrl: row[2]?.trim() ?? '',
        }));
        setTimeout(() => {
          resolve(products);
        }, 500); // Simulate network delay
      },
      error: (error) => reject(error),
    });
  });
};


// Mock selected product IDs (representing user's actual choices)
export const fetchSelectedProducts = async (): Promise<string[]> => {
  // Đọc file .csv chứa các ID sản phẩm
  const response = await fetch('/real_click.csv');
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: false, // Không có tiêu đề trong file CSV
      skipEmptyLines: true,
      complete: (result) => {
        // Trích xuất danh sách các id từ cột đầu tiên
        const ids: string[] = result.data.map((row: any[]) => row[1]?.toString().trim() ?? '').filter(Boolean);
        setTimeout(() => {
          resolve(ids);
        }, 500); // Mô phỏng độ trễ mạng
      },
      error: (error) => reject(error),
    });
  });
};

// Mock recommended product IDs (from the recommendation system)
export const fetchRecommendedProducts = async (): Promise<string[]> => {
  // Đọc file .txt chứa các ID sản phẩm
  const response = await fetch('/recommended (1).txt');
  const textData = await response.text();

  // Tách các ID từ file .txt
  const ids = textData
  .split('\n')
  .map((line) => line.trim())
  .filter((id) => id !== ""); // Loại bỏ các dòng trống
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ids); // Trả về danh sách các ID sản phẩm
    }, 500); // Mô phỏng độ trễ mạng
  });
};

