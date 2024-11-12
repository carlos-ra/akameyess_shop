import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartButton } from '../components/CartButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProductById } from '../services/productService';
import './ProductDetails.css';
const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (id) {
                    const productData = await getProductById(id);
                    setProduct(productData);
                    const firstImage = Object.values(productData.images)[0];
                    setSelectedImage(firstImage);
                }
            }
            catch (error) {
                console.error('Error fetching product:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);
    const handleContactClick = () => {
        // Instagram DM link
        const instagramUsername = 'akameyess';
        const message = `Hi! I'm interested in ${product?.title}`;
        const encodedMessage = encodeURIComponent(message);
        const instagramUrl = `https://ig.me/m/${instagramUsername}?text=${encodedMessage}`;
        window.open(instagramUrl, '_blank');
    };
    if (loading)
        return _jsx(LoadingSpinner, {});
    if (!product)
        return _jsx("div", { children: "Product not found" });
    const imageArray = Object.values(product.images);
    return (_jsxs("div", { className: "product-details", children: [_jsxs("div", { className: "product-images", children: [_jsx("div", { className: "main-image", children: _jsx("img", { src: selectedImage, alt: product.title }) }), _jsx("div", { className: "thumbnail-images", children: imageArray.map((image, index) => (_jsx("img", { src: image, alt: `${product.title} thumbnail ${index + 1}`, className: selectedImage === image ? 'selected' : '', onClick: () => setSelectedImage(image) }, index))) })] }), _jsxs("div", { className: "product-info", children: [_jsx("h1", { children: product.title }), _jsxs("div", { className: "price-rating", children: [_jsxs("span", { className: "price", children: ["$", product.price.toFixed(2)] }), _jsxs("span", { className: "rating", children: ["\u2605 ", product.rating, " (", product.reviews, " reviews)"] })] }), _jsxs("div", { className: "stock-info", children: [_jsx("span", { className: `stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`, children: product.stock > 0 ? 'In Stock' : 'Out of Stock' }), _jsx("span", { className: "stock-quantity", children: product.stock > 0 ? `${product.stock} units available` : '' })] }), _jsx("p", { className: "description", children: product.description }), _jsx(CartButton, { product: product }), _jsx("button", { onClick: handleContactClick, className: "contact-button", children: "Contact on Instagram" })] })] }));
};
export default ProductDetails;
