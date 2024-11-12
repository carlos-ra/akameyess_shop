import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './slices/authSlice';
import cartReducer, { CartState } from './slices/cartSlice';
import productsReducer, { ProductsState } from './slices/productsSlice';

interface StoreState {
  auth: AuthState;
  cart: CartState;
  products: ProductsState;
}

const reducer = {
  auth: authReducer,
  cart: cartReducer,
  products: productsReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = StoreState;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export { store };