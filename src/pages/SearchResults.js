import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { searchProducts } from '../services/productService';
import './CategoryPage.css';
const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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
            }
            catch (err) {
                setError('Failed to load search results');
                console.error('Error loading search results:', err);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchResults();
    }, [query]);
    if (isLoading)
        return _jsx(LoadingSpinner, {});
    if (error)
        return _jsx("div", { className: "error-message", children: error });
    return (_jsxs("div", { className: "category-page", children: [_jsxs("h1", { children: ["Search Results for \"", query, "\""] }), products.length === 0 ? (_jsx("p", { className: "no-results", children: "No products found for your search." })) : (_jsx("div", { className: "products-grid", children: products.map(product => (_jsx(ProductCard, { product: product }, product.id))) }))] }));
};
export default SearchResults;
