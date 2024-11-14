import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { supabase } from '../config/supabase';
import LoadingSpinner from '../components/LoadingSpinner';
import './OrderConfirmation.css';

interface OrderDetails {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  items: {
    id: string;
    title: string;
    quantity: number;
    price_at_time: number;
    images: { [key: string]: string };
  }[];
}

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAppSelector(state => state.auth);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user || !orderId) {
        navigate('/');
        return;
      }

      try {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select(`
            id,
            status,
            total_amount,
            created_at,
            cart_items (
              quantity,
              price_at_time,
              products (
                id,
                title,
                images
              )
            )
          `)
          .eq('id', orderId)
          .eq('user_id', user.uid)
          .single();

        if (orderError) throw orderError;

        setOrder({
          ...orderData,
          items: orderData.cart_items.map((item: any) => ({
            id: item.products.id,
            title: item.products.title,
            quantity: item.quantity,
            price_at_time: item.price_at_time,
            images: item.products.images
          }))
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [user, orderId, navigate]);

  if (loading) {
    return (
      <div className="order-confirmation-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-confirmation-container">
        <div className="error-message">
          {error || 'Order not found'}
        </div>
        <button onClick={() => navigate('/')} className="return-home">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="order-confirmation-container">
      <div className={`status-message status-${order.status}`}>
        <h1>Order Confirmed!</h1>
        <p>Your order has been successfully placed and is now {order.status}.</p>
        <p>Order ID: {order.id}</p>
      </div>

      <div className="order-details">
        <h2>Order Details</h2>
        <div className="order-items">
          {order.items.map((item) => (
            <div key={item.id} className="order-item">
              <img src={Object.values(item.images)[0]} alt={item.title} />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price_at_time.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <div className="total">
            <span>Total:</span>
            <span>${order.total_amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="actions">
          <button onClick={() => navigate('/')} className="continue-shopping">
            Continue Shopping
          </button>
          <button onClick={() => navigate('/orders')} className="view-orders">
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 