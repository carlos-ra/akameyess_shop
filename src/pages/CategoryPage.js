import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProductsByCategory } from '../services/productService';
import './CategoryPage.css';
const CategoryPage = () => {
    const { category } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
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
            }
            catch (err) {
                setError('Failed to load products');
                console.error('Error loading products:', err);
            }
            finally {
                setIsLoading(false);
            }
        };
        loadProducts();
    }, [category, currentPage]);
    if (isLoading)
        return _jsx(LoadingSpinner, {});
    if (error)
        return _jsx("div", { className: "error-message", children: error });
    const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
    return (_jsxs("div", { className: "category-page", children: [_jsxs("h1", { children: [categoryTitle, " Products"] }), _jsx("div", { className: "products-grid", children: products.length > 0 ? (products.map(product => (_jsx(ProductCard, { product: product }, product.id)))) : (_jsx("div", { className: "no-products-message", children: "No products found in this category." })) }), products.length > 0 && (_jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: setCurrentPage }))] }));
};
export default CategoryPage;
