import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { Product } from '../types/product';
import LoadingSpinner from '../components/LoadingSpinner';
import './ProductDetails.css';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(id!);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error loading product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAskForProduct = () => {
    if (product) {
      const message = encodeURIComponent(`I'm interested in ${product.title}`);
      const instagramUrl = `https://ig.me/m/akameyess?text=${message}`;
      window.open(instagramUrl, '_blank');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div className="error-message">Product not found</div>;

  return (
    <div className="product-details">
      <div className="product-gallery">
        <div className="main-image">
          <img src={product.images[selectedImage]} alt={product.title} />
        </div>
        <div className="thumbnail-list">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} ${index + 1}`}
              className={selectedImage === index ? 'active' : ''}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="product-info-detailed">
        <h1>{product.title}</h1>
        <div className="rating-reviews">
          <span className="rating">★ {product.rating}</span>
          <span className="reviews">({product.reviews} reviews)</span>
        </div>
        <div className="price-section">
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
        <p className="description">{product.description}</p>
        <button 
          onClick={handleAskForProduct}
          className="buy-button"
        >
          Ask for this product
        </button>
      </div>
    </div>
  );
};

export default ProductDetails; 