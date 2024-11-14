import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addToCart, removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Product } from '../types/product';
import { useLoginModal } from '../contexts/LoginModalContext';
import { supabase } from '../config/supabase';
import './CartButton.css';

interface CartButtonProps {
  product: Product;
  className?: string;
}

interface SupabaseError {
  code: string;
  message: string;
  details?: string | null;
  hint?: string | null;
}

export const CartButton: React.FC<CartButtonProps> = ({ product, className = '' }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { items, currentOrderId } = useAppSelector(state => state.cart);
  const { setShowLoginModal, setOnLoginSuccess } = useLoginModal();

  const cartItem = items.find(item => item.id === product.id);

  // Check if product is out of stock
  const isOutOfStock = product.stock <= 0;
  // Check if adding one more would exceed stock
  const wouldExceedStock = cartItem && (cartItem.quantity + 1 > product.stock);

  const getOrCreateOrder = async (): Promise<string> => {
    try {
      // First try to get an existing pending order
      const { data: existingOrders, error: fetchError } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user!.uid)
        .eq('status', 'pending');

      if (fetchError) throw fetchError;

      // If there's an existing pending order, use it
      if (existingOrders && existingOrders.length > 0) {
        return existingOrders[0].id;
      }

      // If no pending order exists, create a new one and wait for the response
      const { data: newOrder, error: createError } = await supabase
        .from('orders')
        .insert({
          user_id: user!.uid,
          status: 'pending',
          total_amount: 0
        })
        .select('id')
        .single();

      if (createError) throw createError;
      if (!newOrder?.id) throw new Error('Failed to create order');

      return newOrder.id;
    } catch (error) {
      console.error('Error getting/creating order:', error);
      throw error;
    }
  };

  const handleAddToCart = async () => {
    // Prevent adding if out of stock
    if (isOutOfStock) {
      return;
    }

    // Prevent adding if it would exceed stock
    if (wouldExceedStock) {
      return;
    }

    if (!user) {
      setOnLoginSuccess(() => () => {
        if (!isOutOfStock && !wouldExceedStock) {
          dispatch(addToCart(product));
        }
      });
      setShowLoginModal(true);
      return;
    }

    try {
      // Always get or create an order first
      const orderId = await getOrCreateOrder();

      // Then add to cart
      dispatch(addToCart(product));
      
      // Then sync with Supabase
      const { error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: user.uid,
          order_id: orderId,
          product_id: product.id,
          quantity: cartItem ? cartItem.quantity + 1 : 1,
          price_at_time: product.price,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,product_id,order_id'
        });

      if (error) throw error;
    } catch (error) {
      const supabaseError = error as SupabaseError;
      if (supabaseError?.message?.includes('violates row-level security policy')) {
        const alertContainer = document.createElement('div');
        alertContainer.className = 'verification-alert';
        alertContainer.innerHTML = `
          <div class="verification-alert-content">
            <h3>Email Verification Required</h3>
            <p>Please verify your email address to add items to your cart.</p>
            <p>Check your inbox for the verification link.</p>
            <button onclick="this.parentElement.parentElement.remove()">Got it</button>
          </div>
        `;
        document.body.appendChild(alertContainer);
        setTimeout(() => alertContainer.remove(), 5000);
      }
      console.error('Error adding to cart:', error);
    }
  };

  const handleUpdateQuantity = async (newQuantity: number) => {
    // Prevent updating if it would exceed stock
    if (newQuantity > product.stock) {
      return;
    }

    if (!user) return;

    try {
      // Get or create order if we don't have one
      const orderId = currentOrderId || await getOrCreateOrder();

      if (newQuantity < 1) {
        dispatch(removeFromCart(product.id));
        // Delete the cart item
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.uid)
          .eq('product_id', product.id)
          .eq('order_id', orderId);
      } else {
        dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
        // Update the cart item
        await supabase
          .from('cart_items')
          .upsert({
            user_id: user.uid,
            order_id: orderId,
            product_id: product.id,
            quantity: newQuantity,
            price_at_time: product.price,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,product_id,order_id'
          });
      }
    } catch (error) {
      const supabaseError = error as SupabaseError;
      if (supabaseError?.message?.includes('violates row-level security policy')) {
        const alertContainer = document.createElement('div');
        alertContainer.className = 'verification-alert';
        alertContainer.innerHTML = `
          <div class="verification-alert-content">
            <h3>Email Verification Required</h3>
            <p>Please verify your email address to add items to your cart.</p>
            <p>Check your inbox for the verification link.</p>
            <button onclick="this.parentElement.parentElement.remove()">Got it</button>
          </div>
        `;
        document.body.appendChild(alertContainer);
        setTimeout(() => alertContainer.remove(), 5000);
      }
      console.error('Error updating cart:', error);
    }
  };

  // Show different button states based on stock
  if (cartItem) {
    return (
      <div className="quantity-controls">
        <button 
          onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
          className="quantity-btn"
        >
          -
        </button>
        <span className="quantity">{cartItem.quantity}</span>
        <button 
          onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
          className="quantity-btn"
          disabled={cartItem.quantity >= product.stock}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleAddToCart}
      className={`cart-button ${className} ${isOutOfStock ? 'out-of-stock' : ''}`}
      disabled={isOutOfStock}
    >
      {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
    </button>
  );
};