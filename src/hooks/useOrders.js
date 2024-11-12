import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
export const useOrders = (userId) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) {
                setOrders([]);
                setLoading(false);
                return;
            }
            try {
                const { data: ordersData, error: ordersError } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false });
                if (ordersError)
                    throw ordersError;
                const ordersWithItems = await Promise.all(ordersData.map(async (order) => {
                    const { data: itemsData, error: itemsError } = await supabase
                        .from('cart_items')
                        .select(`
                quantity,
                price_at_time,
                products (
                  id,
                  title,
                  images
                )
              `)
                        .eq('order_id', order.id);
                    if (itemsError)
                        throw itemsError;
                    const typedItemsData = itemsData;
                    return {
                        ...order,
                        items: typedItemsData.map(item => ({
                            id: item.products.id,
                            title: item.products.title,
                            quantity: item.quantity,
                            price_at_time: item.price_at_time,
                            images: item.products.images
                        }))
                    };
                }));
                setOrders(ordersWithItems);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch orders');
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [userId]);
    return { orders, loading, error };
};
