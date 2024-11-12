import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addToCart, removeFromCart, updateQuantity, syncCartItem, getOrCreateOrder } from '../store/slices/cartSlice';
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
  const { items, currentOrderId, orderStatus } = useAppSelector(state => state.cart);
  const { setShowLoginModal, setOnLoginSuccess } = useLoginModal();

  const cartItem = items.find(item => item.id === product.id);

  const handleAddToCart = useCallback(async () => {
    if (!user) {
      setOnLoginSuccess(() => () => {
        dispatch(addToCart(product));
      });
      setShowLoginModal(true);
      return;
    }

    try {
      // First, ensure we have an order
      let orderId = currentOrderId;
      if (!orderId) {
        const result = await dispatch(getOrCreateOrder(user.uid)).unwrap();
        orderId = result.orderId;
      }

      if (!orderId) {
        throw new Error('Failed to create order');
      }

      // Add to cart locally
      dispatch(addToCart(product));

      // If item exists, update quantity, otherwise create new item
      const newQuantity = cartItem ? cartItem.quantity + 1 : 1;
      
      await dispatch(syncCartItem({ 
        userId: user.uid, 
        productId: product.id, 
        quantity: newQuantity,
        orderId,
        price: product.price
      })).unwrap();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }, [user, currentOrderId, product, cartItem, dispatch]);

  const handleUpdateQuantity = useCallback(async (newQuantity: number) => {
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
      console.error('Error updating cart:', error);
      // Revert local state if server update fails
      if (cartItem) {
        dispatch(updateQuantity({ id: product.id, quantity: cartItem.quantity }));
      }
    }
  }, [user, currentOrderId, product, cartItem, dispatch]);

  // Don't show controls if order is not pending
  if (orderStatus && orderStatus !== 'pending') {
    return null;
  }

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