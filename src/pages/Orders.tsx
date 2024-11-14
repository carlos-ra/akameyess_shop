import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import LoadingSpinner from '../components/LoadingSpinner';
import { useOrders } from '../hooks/useOrders';
import './Orders.css';

const Orders: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const { orders, loading, error } = useOrders(user?.uid);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="orders-container">
        <div className="no-orders">Please login to view your orders.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {orders?.length === 0 ? (
        <div className="no-orders">
          <p>No orders found.</p>
          <button 
            onClick={() => navigate('/')} 
            className="new-order-button"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders?.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id.slice(0, 8)}</h3>
                <span className={`order-status status-${order.status}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div className="order-items">
                {order.items?.map((item) => (
                  <div key={item.id} className="order-item">
                    <img 
                      src={Object.values(item.images)[0]} 
                      alt={item.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.png'; // Add a placeholder image
                      }}
                    />
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price_at_time.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <p>Total: ${order.total_amount.toFixed(2)}</p>
                <p>Created: {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 