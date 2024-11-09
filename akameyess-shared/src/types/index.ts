export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: { [key: string]: string };
  category: 'cosplay' | 'beauty';
  sub_category: string;
  rating: number;
  reviews: number;
  featured: boolean;
  stock: number;
  ali_express_link: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
} 