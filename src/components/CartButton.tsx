import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addToCart, removeFromCart, updateQuantity, syncCartItem } from '../store/slices/cartSlice';
import { Product } from '../types/product';
import { useLoginModal } from '../contexts/LoginModalContext';
import './CartButton.css';

interface CartButtonProps {
  product: Product;
  className?: string;
}

interface SupabaseError {
  message: string;
  code: string;
}

export const CartButton: React.FC<CartButtonProps> = ({ product, className = '' }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { items, currentOrderId } = useAppSelector(state => state.cart);
  const { setShowLoginModal, setOnLoginSuccess } = useLoginModal();

  const cartItem = items.find(item => item.id === product.id);

  const showVerificationAlert = () => {
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

    // Remove alert after 5 seconds
    setTimeout(() => {
      alertContainer.remove();
    }, 5000);
  };

  const handleAddToCart = async () => {
    if (!user) {
      setOnLoginSuccess(() => () => {
        dispatch(addToCart(product));
      });
      setShowLoginModal(true);
      return;
    }

    try {
      dispatch(addToCart(product));
      await dispatch(syncCartItem({ 
        userId: user.uid, 
        productId: product.id, 
        quantity: cartItem ? cartItem.quantity + 1 : 1,
        orderId: currentOrderId!,
        price: product.price
      })).unwrap();
    } catch (error) {
      const supabaseError = error as SupabaseError;
      if (supabaseError?.message?.includes('violates row-level security policy')) {
        showVerificationAlert();
      }
      console.error('Error adding to cart:', error);
    }
  };

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (!user || !currentOrderId) return;

    try {
      if (newQuantity < 1) {
        dispatch(removeFromCart(product.id));
      } else {
        dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
      }

      await dispatch(syncCartItem({ 
        userId: user.uid, 
        productId: product.id, 
        quantity: newQuantity,
        orderId: currentOrderId,
        price: product.price
      })).unwrap();
    } catch (error) {
      const supabaseError = error as SupabaseError;
      if (supabaseError?.message?.includes('violates row-level security policy')) {
        showVerificationAlert();
      }
      console.error('Error updating cart:', error);
    }
  };

  return (
    <>
      {cartItem ? (
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
          >
            +
          </button>
        </div>
      ) : (
        <button 
          onClick={handleAddToCart}
          className={`cart-button ${className}`}
        >
          Add to Cart
        </button>
      )}
    </>
  );
}; 