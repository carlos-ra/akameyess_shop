import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import LoadingSpinner from '../components/LoadingSpinner';
import { useOrders } from '../hooks/useOrders';
import './Orders.css';
const Orders = () => {
    const { user } = useAppSelector(state => state.auth);
    const { orders, loading, error } = useOrders(user?.uid);
    const navigate = useNavigate();
    if (!user) {
        return _jsx("div", { className: "orders-container", children: "Please login to view your orders." });
    }
    if (loading)
        return _jsx(LoadingSpinner, {});
    if (error)
        return _jsx("div", { className: "error-message", children: error });
    return (_jsxs("div", { className: "orders-container", children: [_jsx("h1", { children: "My Orders" }), orders.length === 0 ? (_jsx("p", { children: "No orders found." })) : (_jsx("div", { className: "orders-list", children: orders.map((order) => (_jsxs("div", { className: "order-card", children: [_jsxs("div", { className: "order-header", children: [_jsxs("h3", { children: ["Order #", order.id.slice(0, 8)] }), _jsx("span", { className: `order-status status-${order.status}`, children: order.status.toUpperCase() })] }), _jsx("div", { className: "order-items", children: order.items.map((item) => (_jsxs("div", { className: "order-item", children: [_jsx("img", { src: Object.values(item.images)[0], alt: item.title }), _jsxs("div", { className: "item-details", children: [_jsx("h4", { children: item.title }), _jsxs("p", { children: ["Quantity: ", item.quantity] }), _jsxs("p", { children: ["Price: $", item.price_at_time.toFixed(2)] })] })] }, item.id))) }), _jsxs("div", { className: "order-footer", children: [_jsxs("p", { children: ["Total: $", order.total_amount.toFixed(2)] }), _jsxs("p", { children: ["Created: ", new Date(order.created_at).toLocaleDateString()] })] })] }, order.id))) })), !orders.some(order => order.status === 'pending') && (_jsx("button", { onClick: () => navigate('/cart'), className: "new-order-button", children: "Start New Order" }))] }));
};
export default Orders;
