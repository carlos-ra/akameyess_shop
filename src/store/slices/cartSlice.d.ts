import { Product } from '../../types/product';
interface CartItem extends Product {
    quantity: number;
    order_id?: string | null;
    price_at_time: number;
}
interface CartState {
    items: CartItem[];
    total: number;
    isOpen: boolean;
    currentOrderId: string | null;
    orderStatus: 'pending' | 'processing' | 'completed' | 'cancelled' | null;
}
interface CartResponse {
    orderId: string | null;
    status: CartState['orderStatus'];
    items: CartItem[];
}
export declare const getOrCreateOrder: import("@reduxjs/toolkit").AsyncThunk<{
    orderId: any;
    status: CartState["orderStatus"];
}, string, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const syncCartItem: import("@reduxjs/toolkit").AsyncThunk<void, {
    userId: string;
    productId: string;
    quantity: number;
    orderId: string;
    price: number;
}, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const loadUserCart: import("@reduxjs/toolkit").AsyncThunk<CartResponse, string, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateOrderStatus: import("@reduxjs/toolkit").AsyncThunk<"pending" | "processing" | "completed" | "cancelled" | null, {
    orderId: string;
    status: CartState["orderStatus"];
}, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const addToCart: import("@reduxjs/toolkit").ActionCreatorWithPayload<Product, "cart/addToCart">, removeFromCart: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "cart/removeFromCart">, updateQuantity: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    quantity: number;
}, "cart/updateQuantity">, clearCart: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"cart/clearCart">, toggleCart: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"cart/toggleCart">;
declare const _default: import("redux").Reducer<CartState>;
export default _default;
