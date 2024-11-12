import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleCart, removeFromCart, updateQuantity, syncCartItem } from '../store/slices/cartSlice';
import './CartDrawer.css';
export const CartDrawer = () => {
    const dispatch = useAppDispatch();
    const { items, total, isOpen, currentOrderId } = useAppSelector(state => state.cart);
    const { user } = useAppSelector(state => state.auth);
    const handleQuantityChange = async (productId, newQuantity, price) => {
        if (!user || !currentOrderId)
            return;
        try {
            if (newQuantity < 1) {
                dispatch(removeFromCart(productId));
            }
            else {
                dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
            }
            await dispatch(syncCartItem({
                userId: user.uid,
                productId,
                quantity: newQuantity,
                orderId: currentOrderId,
                price
            })).unwrap();
        }
        catch (error) {
            console.error('Error updating cart:', error);
            // Revert local state if server update fails
            const originalItem = items.find(item => item.id === productId);
            if (originalItem) {
                dispatch(updateQuantity({
                    id: productId,
                    quantity: originalItem.quantity
                }));
            }
        }
    };
    const handleRemoveItem = async (productId, price) => {
        if (!user || !currentOrderId)
            return;
        try {
            dispatch(removeFromCart(productId));
            await dispatch(syncCartItem({
                userId: user.uid,
                productId,
                quantity: 0,
                orderId: currentOrderId,
                price
            })).unwrap();
        }
        catch (error) {
            console.error('Error removing item:', error);
            // Revert local state if server update fails
            const originalItem = items.find(item => item.id === productId);
            if (originalItem) {
                dispatch(updateQuantity({
                    id: productId,
                    quantity: originalItem.quantity
                }));
            }
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "cart-drawer-overlay", children: _jsxs("div", { className: "cart-drawer", children: [_jsxs("div", { className: "cart-header", children: [_jsx("h3", { children: "Shopping Cart" }), _jsx("button", { onClick: () => dispatch(toggleCart()), className: "close-button", children: "\u00D7" })] }), _jsx("div", { className: "cart-items", children: items.length === 0 ? (_jsx("div", { className: "empty-cart", children: "Your cart is empty" })) : (items.map((item) => (_jsxs("div", { className: "cart-item", children: [_jsx("img", { src: Object.values(item.images)[0], alt: item.title }), _jsxs("div", { className: "item-details", children: [_jsx("h4", { children: item.title }), _jsxs("p", { className: "price", children: ["$", item.price.toFixed(2)] }), _jsxs("div", { className: "quantity-controls", children: [_jsx("button", { onClick: () => handleQuantityChange(item.id, item.quantity - 1, item.price), disabled: item.quantity <= 1, children: "-" }), _jsx("span", { children: item.quantity }), _jsx("button", { onClick: () => handleQuantityChange(item.id, item.quantity + 1, item.price), children: "+" })] })] }), _jsx("button", { onClick: () => handleRemoveItem(item.id, item.price), className: "remove-button", children: "Remove" })] }, item.id)))) }), items.length > 0 && (_jsxs("div", { className: "cart-footer", children: [_jsxs("div", { className: "total", children: [_jsx("span", { children: "Total:" }), _jsxs("span", { children: ["$", total.toFixed(2)] })] }), _jsx("button", { className: "checkout-button", children: "Proceed to Checkout" })] }))] }) }));
};
