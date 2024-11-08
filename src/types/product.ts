export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: 'cosplay' | 'beauty';
  subCategory?: string;
  rating: number;
  reviews: number;
  aliExpressLink: string;
  featured?: boolean;
} 