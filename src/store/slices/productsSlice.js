import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeaturedProducts, getProductsByCategory, getProductById } from '../../services/productService';
const initialState = {
    featured: [],
    beautyProducts: [],
    cosplayProducts: [],
    categoryProducts: [],
    currentProduct: null,
    loading: false,
    error: null,
    totalPages: 1,
};
export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeatured', async () => {
    const products = await getFeaturedProducts();
    return products;
});
export const fetchProductsByCategory = createAsyncThunk('products/fetchByCategory', async ({ category, page }) => {
    const response = await getProductsByCategory(category, page);
    return response;
});
export const fetchProductById = createAsyncThunk('products/fetchById', async (id) => {
    const product = await getProductById(id);
    return product;
});
export const fetchBeautyProducts = createAsyncThunk('products/fetchBeauty', async () => {
    const response = await getProductsByCategory('beauty', 1);
    return response.products;
});
export const fetchCosplayProducts = createAsyncThunk('products/fetchCosplay', async () => {
    const response = await getProductsByCategory('cosplay', 1);
    return response.products;
});
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Featured Products
            .addCase(fetchFeaturedProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.featured = action.payload;
        })
            .addCase(fetchFeaturedProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch featured products';
        })
            // Category Products
            .addCase(fetchProductsByCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categoryProducts = action.payload.products;
            state.totalPages = action.payload.totalPages;
        })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch category products';
        })
            // Single Product
            .addCase(fetchProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentProduct = action.payload;
        })
            .addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch product';
        })
            .addCase(fetchBeautyProducts.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchBeautyProducts.fulfilled, (state, action) => {
            state.beautyProducts = action.payload;
            state.loading = false;
        })
            .addCase(fetchBeautyProducts.rejected, (state, action) => {
            state.error = action.error.message || 'Failed to fetch beauty products';
            state.loading = false;
        })
            .addCase(fetchCosplayProducts.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchCosplayProducts.fulfilled, (state, action) => {
            state.cosplayProducts = action.payload;
            state.loading = false;
        })
            .addCase(fetchCosplayProducts.rejected, (state, action) => {
            state.error = action.error.message || 'Failed to fetch cosplay products';
            state.loading = false;
        });
    },
});
export const { clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;
