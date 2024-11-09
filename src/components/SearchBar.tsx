import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/productService';
import { Product } from '../types/product';
import LoadingSpinner from './LoadingSpinner';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadSuggestions = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const results = await searchProducts(searchQuery);
      setSuggestions(results);
    } catch (error) {
      console.error('Error loading suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setQuery('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    loadSuggestions(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button onClick={() => handleSearch()} className="search-button">
          Search
        </button>
      </div>
      
      {showSuggestions && query.trim() !== '' && (
        <div className="suggestions-container">
          {loading ? (
            <div className="suggestion-item loading">
              <LoadingSpinner size="small" />
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((product) => (
              <div
                key={product.id}
                className="suggestion-item"
                onClick={() => {
                  navigate(`/product/${product.id}`);
                  setShowSuggestions(false);
                  setQuery('');
                }}
              >
                <img 
                  src={Object.values(product.images)[0]} 
                  alt={product.title} 
                  className="suggestion-image"
                />
                <div className="suggestion-info">
                  <span className="suggestion-title">{product.title}</span>
                  <span className="suggestion-price">${product.price.toFixed(2)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="suggestion-item no-results">No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;