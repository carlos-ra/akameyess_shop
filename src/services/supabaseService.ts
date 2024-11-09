import { supabase } from '../config/supabase';
import { Product } from '../types/product';

export interface ProductFilters {
  category?: 'cosplay' | 'beauty';
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  perPage?: number;
}

// Add this helper function
const transformProductImages = (product: any) => {
  const images = [];
  let i = 1;
  while (product[`image_${i}`]) {
    images.push(product[`image_${i}`]);
    i++;
  }
  
  // Remove individual image fields and add images array
  const { image_1, image_2, image_3, image_4, image_5, ...rest } = product;
  return {
    ...rest,
    images
  };
};

export const supabaseService = {
  async getProducts(filters: ProductFilters = {}) {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      page = 1,
      perPage = 12
    } = filters;

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    if (minPrice !== undefined) {
      query = query.gte('price', minPrice);
    }
    if (maxPrice !== undefined) {
      query = query.lte('price', maxPrice);
    }
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    // Pagination
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, error, count } = await query
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return {
      products: data as Product[],
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / perPage)
    };
  },

  async getFeaturedProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(8);

    if (error) {
      throw error;
    }

    return data as Product[];
  },

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return transformProductImages(data);
  },

  async getUserCart(userId: string) {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        quantity,
        products (*)
      `)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return data.map(item => ({
      ...item.products,
      quantity: item.quantity
    }));
  },

  async updateCartItem(userId: string, productId: string, quantity: number) {
    if (quantity <= 0) {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        product_id: productId,
        quantity
      });

    if (error) throw error;
  },

  async removeFromCart(userId: string, productId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
  },

  async clearCart(userId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  }
}; 