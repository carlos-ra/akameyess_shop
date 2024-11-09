import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { searchProducts } from '../services/productService';
import { Product } from '../types/product';
import './CategoryPage.css';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setProducts([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const results = await searchProducts(query);
        setProducts(results || []);
      } catch (err) {
        setError('Failed to load search results');
        console.error('Error loading search results:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="category-page">
      <h1>Search Results for "{query}"</h1>
      {products.length === 0 ? (
        <p className="no-results">No products found for your search.</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 