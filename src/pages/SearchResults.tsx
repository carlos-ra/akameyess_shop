import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { searchProducts } from '../services/productService';
import { Product } from '../types/product';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const result = await searchProducts(query, 'cosplay', 1); // Default to cosplay category
        setProducts(result.products);
      } catch (err) {
        setError('Failed to load search results');
        console.error('Error loading search results:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [query]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>
      {products.length === 0 ? (
        <p>No products found matching your search.</p>
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