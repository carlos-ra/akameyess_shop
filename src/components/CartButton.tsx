import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addToCart, removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Product } from '../types/product';
import { useLoginModal } from '../contexts/LoginModalContext';
import './CartButton.css';

interface CartButtonProps {
  product: Product;
  className?: string;
}

export const CartButton: React.FC<CartButtonProps> = ({ product, className = '' }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { items } = useAppSelector(state => state.cart);
  const { setShowLoginModal, setOnLoginSuccess } = useLoginModal();

  const cartItem = items.find(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!user) {
      setOnLoginSuccess(() => () => dispatch(addToCart(product)));
      setShowLoginModal(true);
      return;
    }
    dispatch(addToCart(product));
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(product.id));
      return;
    }
    dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
  };

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
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleAddToCart}
      className={`cart-button ${className}`}
    >
      Add to Cart
    </button>
  );
}; 