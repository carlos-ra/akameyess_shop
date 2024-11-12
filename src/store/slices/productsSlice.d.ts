import { Product } from '../../types/product';
interface ProductsState {
    featured: Product[];
    beautyProducts: Product[];
    cosplayProducts: Product[];
    categoryProducts: Product[];
    currentProduct: Product | null;
    loading: boolean;
    error: string | null;
    totalPages: number;
}
export declare const fetchFeaturedProducts: import("@reduxjs/toolkit").AsyncThunk<Product[], void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const fetchProductsByCategory: import("@reduxjs/toolkit").AsyncThunk<import("../../types/product").ProductsResponse, {
    category: "cosplay" | "beauty";
    page: number;
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
export declare const fetchProductById: import("@reduxjs/toolkit").AsyncThunk<Product, string, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const fetchBeautyProducts: import("@reduxjs/toolkit").AsyncThunk<Product[], void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const fetchCosplayProducts: import("@reduxjs/toolkit").AsyncThunk<Product[], void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const clearCurrentProduct: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"products/clearCurrentProduct">;
declare const _default: import("redux").Reducer<ProductsState>;
export default _default;
