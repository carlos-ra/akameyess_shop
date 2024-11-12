interface OrderItem {
    id: string;
    title: string;
    quantity: number;
    price_at_time: number;
    images: {
        [key: string]: string;
    };
}
interface Order {
    id: string;
    user_id: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    total_amount: number;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
}
export declare const useOrders: (userId?: string) => {
    orders: Order[];
    loading: boolean;
    error: string | null;
};
export {};
