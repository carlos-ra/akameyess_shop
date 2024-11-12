import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { CartButton } from './CartButton';
import './ProductCard.css';
export const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const handleCardClick = (e) => {
        if (!e.target.closest('.cart-button')) {
            navigate(`/product/${product.id}`);
        }
    };
    const firstImage = Object.values(product.images)[0];
    return (_jsxs("div", { className: "product-card", children: [_jsxs("div", { className: "product-image-container", onClick: handleCardClick, children: [_jsx("img", { src: firstImage, alt: product.title, className: "product-image" }), _jsx("div", { className: "hover-overlay", children: _jsx("button", { className: "view-details-btn", children: "View Details" }) })] }), _jsxs("div", { className: "product-info", onClick: handleCardClick, children: [_jsx("h3", { children: product.title }), _jsxs("div", { className: "price-rating", children: [_jsxs("span", { className: "price", children: ["$", product.price.toFixed(2)] }), _jsxs("span", { className: "rating", children: ["\u2605 ", product.rating, " (", product.reviews, ")"] })] }), _jsx("div", { onClick: e => e.stopPropagation(), children: _jsx(CartButton, { product: product }) })] })] }));
};
