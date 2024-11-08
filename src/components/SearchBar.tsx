import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/productService';
import { Product } from '../types/product';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const loadSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const cosplayResults = await searchProducts(query, 'cosplay', 1);
        const beautyResults = await searchProducts(query, 'beauty', 1);
        const allResults = [...cosplayResults.products, ...beautyResults.products];
        
        // Sort by relevance and limit to 8 results
        const sortedResults = allResults
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8);
        
        setSuggestions(sortedResults);
      } catch (error) {
        console.error('Error loading suggestions:', error);
      }
    };

    const debounceTimer = setTimeout(loadSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setShowDropdown(false);
    setQuery('');
  };

  return (
    <div className="search-bar-container" ref={searchBarRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search products..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <div className="search-suggestions" ref={dropdownRef}>
          {suggestions.map((product) => (
            <div
              key={product.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(product.id)}
            >
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="suggestion-image"
              />
              <div className="suggestion-details">
                <span className="suggestion-title">{product.title}</span>
                <span className="suggestion-price">${product.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 