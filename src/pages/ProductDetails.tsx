import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartButton } from '../components/CartButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProductById } from '../services/productService';
import { Product } from '../types/product';
import './ProductDetails.css';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const productData = await getProductById(id);
          setProduct(productData);
          const firstImage = Object.values(productData.images)[0];
          setSelectedImage(firstImage);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
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

  if (loading) return <LoadingSpinner />;
  if (!product) return <div>Product not found</div>;

  const imageArray = Object.values(product.images);

  return (
    <div className="product-details">
      <div className="product-images">
        <div className="main-image">
          <img src={selectedImage} alt={product.title} />
        </div>
        <div className="thumbnail-images">
          {imageArray.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} thumbnail ${index + 1}`}
              className={selectedImage === image ? 'selected' : ''}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <div className="price-rating">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="rating">★ {product.rating} ({product.reviews} reviews)</span>
        </div>
        <div className="stock-info">
          <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          <span className="stock-quantity">
            {product.stock > 0 ? `${product.stock} units available` : ''}
          </span>
        </div>
        <p className="description">{product.description}</p>
        <CartButton product={product} />
        <button 
          onClick={handleContactClick}
          className="contact-button"
        >
          Contact on Instagram
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;