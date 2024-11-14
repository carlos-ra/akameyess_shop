import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { supabase } from '../config/supabase';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total, isOpen, currentOrderId } = useAppSelector(state => state.cart);
  const { user } = useAppSelector(state => state.auth);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(toggleCart());
    }
  };

  const handleCheckout = async () => {
    setError(null);
    setShowConfirmation(true);
  };

  const validateStockAndUpdateQuantities = async () => {
    try {
      // Get current stock levels for all items
      const { data: products, error: stockError } = await supabase
        .from('products')
        .select('id, stock')
        .in('id', items.map(item => item.id));

      if (stockError) throw stockError;

      // Check if all items have enough stock
      const stockMap = new Map(products.map(p => [p.id, p.stock]));
      const invalidItems = items.filter(item => {
        const currentStock = stockMap.get(item.id) || 0;
        return item.quantity > currentStock;
      });

      if (invalidItems.length > 0) {
        const itemNames = invalidItems.map(item => item.title).join(', ');
        throw new Error(`Not enough stock for: ${itemNames}`);
      }

      // Update stock levels in Supabase
      for (const item of items) {
        const currentStock = stockMap.get(item.id) || 0;
        const newStock = currentStock - item.quantity;

        const { error: updateError } = await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', item.id);

        if (updateError) throw updateError;
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to validate stock levels');
      }
      return false;
    }
  };

  const handleConfirmOrder = async () => {
    if (!user || !currentOrderId) return;

    try {
      // First validate stock and update quantities
      const isValid = await validateStockAndUpdateQuantities();
      if (!isValid) return;

      // Update order status to processing
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'processing',
          updated_at: new Date().toISOString()
        })
        .eq('id', currentOrderId);

      if (error) throw error;

      // Clear the cart
      dispatch(clearCart());
      
      // Close the drawer
      dispatch(toggleCart());
      
      // Navigate to confirmation page
      navigate(`/order-confirmation?orderId=${currentOrderId}`);
    } catch (error) {
      console.error('Error processing checkout:', error);
      setError(error instanceof Error ? error.message : 'Failed to process order');
    }
  };

  const handleCancelOrder = () => {
    setShowConfirmation(false);
    setError(null);
  };

  const handleQuantityChange = async (productId: string, newQuantity: number, price: number) => {
    if (!user || !currentOrderId) return;

    try {
      if (newQuantity < 1) {
        // First update Supabase
        const { error: deleteError } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.uid)
          .eq('product_id', productId)
          .eq('order_id', currentOrderId);

        if (deleteError) throw deleteError;

        // Then update Redux state
        dispatch(removeFromCart(productId));
      } else {
        // First update Supabase
        const { error: updateError } = await supabase
          .from('cart_items')
          .upsert({
            user_id: user.uid,
            order_id: currentOrderId,
            product_id: productId,
            quantity: newQuantity,
            price_at_time: price,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,product_id,order_id'
          });

        if (updateError) throw updateError;

        // Then update Redux state
        dispatch(updateQuantity({ 
          id: productId, 
          quantity: newQuantity 
        }));
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      // Optionally show error to user
      setError(error instanceof Error ? error.message : 'Failed to update cart');
    }
  };

  if (!isOpen) return null;
  if (!user) return null;

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
            {error && <div className="error-message">{error}</div>}
            {showConfirmation ? (
              <div className="confirmation-buttons">
                <p>Are you sure you want to place this order?</p>
                <div className="button-group">
                  <button 
                    onClick={handleConfirmOrder}
                    className="confirm-button"
                  >
                    Confirm Order
                  </button>
                  <button 
                    onClick={handleCancelOrder}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button 
                className="checkout-button"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 