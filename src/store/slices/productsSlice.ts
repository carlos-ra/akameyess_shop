import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import { 
  getProductById, 
  getProductsByCategory, 
  getFeaturedProducts 
} from '../../services/productService';

export interface ProductsState {
  featured: Product[];
  beautyProducts: Product[];
  cosplayProducts: Product[];
  categoryProducts: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
}

const initialState: ProductsState = {
  featured: [],
  beautyProducts: [],
  cosplayProducts: [],
  categoryProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
  totalPages: 1
};

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeatured',
  async () => {
    const products = await getFeaturedProducts();
    return products;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async ({ category, page }: { category: 'cosplay' | 'beauty'; page: number }) => {
    const response = await getProductsByCategory(category, page);
    return response;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: string) => {
    const product = await getProductById(id);
    return product;
  }
);

export const fetchBeautyProducts = createAsyncThunk(
  'products/fetchBeauty',
  async () => {
    const response = await getProductsByCategory('beauty', 1);
    return response.products;
  }
);

export const fetchCosplayProducts = createAsyncThunk(
  'products/fetchCosplay',
  async () => {
    const response = await getProductsByCategory('cosplay', 1);
    return response.products;
  }
);

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
      .addCase(fetchBeautyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBeautyProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.beautyProducts = action.payload;
      })
      .addCase(fetchBeautyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch beauty products';
      })
      .addCase(fetchCosplayProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCosplayProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cosplayProducts = action.payload;
      })
      .addCase(fetchCosplayProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cosplay products';
      });
  },
});

export const { clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer; 