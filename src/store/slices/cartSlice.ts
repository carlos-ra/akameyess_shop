import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../config/supabase';
import { Product } from '../../types/product';
import { signOut } from './authSlice';

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

const initialState: CartState = {
  items: [],
  total: 0,
  isOpen: false,
  currentOrderId: null,
  orderStatus: null
};

export const getOrCreateOrder = createAsyncThunk(
  'cart/getOrCreateOrder',
  async (userId: string) => {
    const { data: existingOrder, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'pending')
      .single();

    if (!fetchError && existingOrder) {
      return {
        orderId: existingOrder.id,
        status: existingOrder.status as CartState['orderStatus']
      };
    }

    const { data: newOrder, error: createError } = await supabase
      .from('orders')
      .insert([{
        user_id: userId,
        status: 'pending',
        total_amount: 0
      }])
      .select()
      .single();

    if (createError) throw createError;

    return {
      orderId: newOrder!.id,
      status: 'pending' as CartState['orderStatus']
    };
  }
);

export const syncCartItem = createAsyncThunk(
  'cart/syncItem',
  async ({ 
    userId, 
    productId, 
    quantity,
    orderId,
    price 
  }: { 
    userId: string; 
    productId: string; 
    quantity: number;
    orderId: string;
    price: number;
  }) => {
    try {
      if (quantity > 0) {
        // First check if item exists
        const { data: existingItem } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', userId)
          .eq('product_id', productId)
          .eq('order_id', orderId)
          .single();

        if (existingItem) {
          // Update existing item
          const { error: updateError } = await supabase
            .from('cart_items')
            .update({ 
              quantity,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', userId)
            .eq('product_id', productId)
            .eq('order_id', orderId);

          if (updateError) throw updateError;
        } else {
          // Insert new item
          const { error: insertError } = await supabase
            .from('cart_items')
            .insert([{ 
              user_id: userId,
              product_id: productId,
              order_id: orderId,
              quantity,
              price_at_time: price,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }]);

          if (insertError) throw insertError;
        }
      } else {
        // Delete item if quantity is 0
        const { error: deleteError } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId)
          .eq('order_id', orderId);

        if (deleteError) throw deleteError;
      }

      // Update order total
      const { data: cartItems } = await supabase
        .from('cart_items')
        .select('quantity, price_at_time')
        .eq('order_id', orderId);

      const total = (cartItems || []).reduce((sum, item) => 
        sum + (item.quantity * item.price_at_time), 0
      );

      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          total_amount: total,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (updateError) throw updateError;
    } catch (error) {
      console.error('Error syncing cart item:', error);
      throw error;
    }
  }
);

export const loadUserCart = createAsyncThunk<CartResponse, string>(
  'cart/loadUserCart',
  async (userId: string) => {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'pending')
      .single();

    if (orderError && orderError.code !== 'PGRST116') throw orderError;

    if (!order) {
      return {
        orderId: null,
        status: null,
        items: []
      };
    }

    const { data: cartItems, error: itemsError } = await supabase
      .from('cart_items')
      .select(`
        quantity,
        price_at_time,
        order_id,
        products (*)
      `)
      .eq('order_id', order.id);

    if (itemsError) throw itemsError;

    const items: CartItem[] = cartItems.map(item => ({
      ...item.products,
      quantity: item.quantity,
      price_at_time: item.price_at_time,
      order_id: item.order_id
    }));

    return {
      orderId: order.id,
      status: order.status as CartState['orderStatus'],
      items
    };
  }
);

export const updateOrderStatus = createAsyncThunk(
  'cart/updateOrderStatus',
  async ({ 
    orderId, 
    status 
  }: { 
    orderId: string; 
    status: CartState['orderStatus']
  }) => {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) throw error;
    return status;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (state.orderStatus !== 'pending') return;
      
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ 
          ...action.payload, 
          quantity: 1,
          price_at_time: action.payload.price,
          order_id: state.currentOrderId 
        });
      }
      state.total = state.items.reduce((sum, item) => sum + item.price_at_time * item.quantity, 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      if (state.orderStatus !== 'pending') return;
      
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.price_at_time * item.quantity, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      if (state.orderStatus !== 'pending') return;
      
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce((sum, item) => sum + item.price_at_time * item.quantity, 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.currentOrderId = null;
      state.orderStatus = null;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.items = action.payload.items;
        state.currentOrderId = action.payload.orderId;
        state.orderStatus = action.payload.status;
        state.total = action.payload.items.reduce(
          (sum, item) => sum + item.price_at_time * item.quantity, 
          0
        );
      })
      .addCase(getOrCreateOrder.fulfilled, (state, action) => {
        state.currentOrderId = action.payload.orderId;
        state.orderStatus = action.payload.status;
      })
      .addCase(signOut.fulfilled, () => {
        return initialState;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer; 