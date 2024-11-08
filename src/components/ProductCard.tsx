import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.images[0]} alt={product.title} className="product-image" />
        <div className="hover-overlay">
          <button onClick={handleViewDetails} className="view-details-btn">
            View Details
          </button>
        </div>
      </div>
      <div className="product-info" onClick={handleViewDetails} style={{ cursor: 'pointer' }}>
        <h3>{product.title}</h3>
        <div className="price-rating">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="rating">★ {product.rating} ({product.reviews})</span>
        </div>
      </div>
    </div>
  );
}; 