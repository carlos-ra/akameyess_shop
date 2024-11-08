import { aliExpressService } from './aliExpressService';

// Create wrapper functions that call the instance methods
export const searchProducts = (query: string, category: 'cosplay' | 'beauty', page?: number) => 
  aliExpressService.searchProducts(query, category, page);

export const getFeaturedProducts = () => 
  aliExpressService.getFeaturedProducts();

export const getProductsByCategory = (category: 'cosplay' | 'beauty', page?: number) => 
  aliExpressService.getProductsByCategory(category, page);

export const getProductById = (id: string) => 
  aliExpressService.getProductById(id);