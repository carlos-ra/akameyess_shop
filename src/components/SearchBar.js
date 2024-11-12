import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/productService';
import LoadingSpinner from './LoadingSpinner';
import './SearchBar.css';
const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const loadSuggestions = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setSuggestions([]);
            return;
        }
        try {
            setLoading(true);
            const results = await searchProducts(searchQuery);
            setSuggestions(results);
        }
        catch (error) {
            console.error('Error loading suggestions:', error);
            setSuggestions([]);
        }
        finally {
            setLoading(false);
        }
    };
    const handleSearch = (searchQuery = query) => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setShowSuggestions(false);
            setQuery('');
        }
    };
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowSuggestions(true);
        loadSuggestions(value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (_jsxs("div", { className: "search-container", ref: searchRef, children: [_jsxs("div", { className: "search-input-container", children: [_jsx("input", { type: "text", placeholder: "Search products...", value: query, onChange: handleInputChange, onKeyDown: handleKeyDown, className: "search-input" }), _jsx("button", { onClick: () => handleSearch(), className: "search-button", children: "Search" })] }), showSuggestions && query.trim() !== '' && (_jsx("div", { className: "suggestions-container", children: loading ? (_jsx("div", { className: "suggestion-item loading", children: _jsx(LoadingSpinner, { size: "small" }) })) : suggestions.length > 0 ? (suggestions.map((product) => (_jsxs("div", { className: "suggestion-item", onClick: () => {
                        navigate(`/product/${product.id}`);
                        setShowSuggestions(false);
                        setQuery('');
                    }, children: [_jsx("img", { src: Object.values(product.images)[0], alt: product.title, className: "suggestion-image" }), _jsxs("div", { className: "suggestion-info", children: [_jsx("span", { className: "suggestion-title", children: product.title }), _jsxs("span", { className: "suggestion-price", children: ["$", product.price.toFixed(2)] })] })] }, product.id)))) : (_jsx("div", { className: "suggestion-item no-results", children: "No products found" })) }))] }));
};
export default SearchBar;
