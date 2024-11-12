import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleCart, removeFromCart, updateQuantity, syncCartItem } from '../store/slices/cartSlice';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, total, isOpen, currentOrderId } = useAppSelector(state => state.cart);
  const { user } = useAppSelector(state => state.auth);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target === e.currentTarget) {
      dispatch(toggleCart());
    }
  };

  if (!isOpen) return null;
  if (!user) return null;

  const handleQuantityChange = async (productId: string, newQuantity: number, price: number) => {
    if (!user || !currentOrderId) return;

    try {
      if (newQuantity < 1) {
        dispatch(removeFromCart(productId));
      } else {
        dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
      }

      await dispatch(syncCartItem({ 
        userId: user.uid, 
        productId, 
        quantity: newQuantity,
        orderId: currentOrderId,
        price
      })).unwrap();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={handleOverlayClick}>
      <div className="cart-drawer">
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button onClick={() => dispatch(toggleCart())} className="close-button">
            ×
          </button>
        </div>
        
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            items.map((item) => (
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
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.price)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.price)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => handleQuantityChange(item.id, 0, item.price)}
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