import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProductsByCategory } from '../services/productService';
import { Product } from '../types/product';
import './CategoryPage.css';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      if (!categoryName) {
        setError('Category not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getProductsByCategory(categoryName as 'cosplay' | 'beauty', 1);
        setProducts(data.products);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryName]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  const title = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : '';

  return (
    <div className="category-page">
      <h1>{title} Products</h1>
      
      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products-message">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;