import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProductsByCategory } from '../services/productService';
import { Product } from '../types/product';
import './CategoryPage.css';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      if (category !== 'cosplay' && category !== 'beauty') {
        setError('Invalid category');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getProductsByCategory(category, currentPage);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category, currentPage]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <div className="category-page">
      <h1>{categoryTitle} Products</h1>
      
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
      
      {products.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CategoryPage;