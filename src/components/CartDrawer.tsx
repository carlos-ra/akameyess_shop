import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleCart, removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items = [], total = 0, isOpen = false } = useAppSelector((state) => state.cart) || {};

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay">
      <div className="cart-drawer">
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button 
            onClick={() => dispatch(toggleCart())}
            className="close-button"
          >
            ×
          </button>
        </div>
        
        <div className="cart-items">
          {items.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <img 
                  src={Object.values(item.images)[0]} 
                  alt={item.title} 
                />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p className="price">${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-button">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 