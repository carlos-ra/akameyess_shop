import { Product, ProductsResponse } from '../types/product';
export declare const getFeaturedProducts: () => Promise<Product[]>;
export declare const getProductsByCategory: (category: "cosplay" | "beauty", page?: number) => Promise<ProductsResponse>;
export declare const getProductById: (id: string) => Promise<Product>;
export declare const searchProducts: (query: string) => Promise<Product[]>;
