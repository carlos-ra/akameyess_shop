import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import { CartButton } from './CartButton';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.cart-button')) {
      navigate(`/product/${product.id}`);
    }
  };

  const firstImage = Object.values(product.images)[0];

  return (
    <div className="product-card">
      <div className="product-image-container" onClick={handleCardClick}>
        <img src={firstImage} alt={product.title} className="product-image" />
        <div className="hover-overlay">
          <button className="view-details-btn">
            View Details
          </button>
        </div>
      </div>
      <div className="product-info" onClick={handleCardClick}>
        <h3>{product.title}</h3>
        <div className="price-rating">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="rating">★ {product.rating} ({product.reviews})</span>
        </div>
        <div onClick={e => e.stopPropagation()}>
          <CartButton product={product} />
        </div>
      </div>
    </div>
  );
}; 