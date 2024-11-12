import { supabase } from '../config/supabase';
const ITEMS_PER_PAGE = 12;
export const getFeaturedProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true);
    if (error)
        throw error;
    return data;
};
export const getProductsByCategory = async (category, page = 1) => {
    // Calculate pagination
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    // Get products with count
    const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .eq('category', category)
        .range(from, to)
        .order('created_at', { ascending: false });
    if (error)
        throw error;
    return {
        products: data,
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE)
    };
};
export const getProductById = async (id) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
    if (error)
        throw error;
    return data;
};
export const searchProducts = async (query) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('title', `%${query}%`)
        .limit(10);
    if (error)
        throw error;
    return data;
};
