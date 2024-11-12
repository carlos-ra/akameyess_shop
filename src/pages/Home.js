import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Carousel from '../components/Carousel';
import SplineModel from '../components/SplineModel';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchFeaturedProducts, fetchBeautyProducts, fetchCosplayProducts } from '../store/slices/productsSlice';
import './Home.css';
const Home = () => {
    const dispatch = useAppDispatch();
    const { featured = [], beautyProducts = [], cosplayProducts = [], loading = false, error = null } = useAppSelector((state) => state.products) || {};
    useEffect(() => {
        dispatch(fetchFeaturedProducts());
        dispatch(fetchBeautyProducts());
        dispatch(fetchCosplayProducts());
    }, [dispatch]);
    return (_jsxs("div", { className: "home", children: [_jsxs("section", { className: "hero", children: [_jsxs("div", { className: "hero-content", children: [_jsxs("h1", { children: ["Welcome to Akameyess Shop", _jsx("span", { className: "signature-label", children: "by Natalia Castellanos" })] }), _jsx("p", { children: "Your one-stop shop for cosplay costumes and beauty products" })] }), _jsx("div", { className: "hero-model", children: _jsx(SplineModel, {}) })] }), error ? (_jsx("div", { className: "error-message", children: error })) : loading ? (_jsx(LoadingSpinner, {})) : (_jsxs(_Fragment, { children: [_jsx(Carousel, { products: beautyProducts, title: "Trending Beauty Products", direction: "left" }), _jsx(Carousel, { products: cosplayProducts, title: "Popular Cosplay Products", direction: "right" }), _jsxs("section", { className: "featured-categories", children: [_jsx("h2", { children: "Shop by Category" }), _jsxs("div", { className: "category-cards", children: [_jsxs(Link, { to: "/category/cosplay", className: "category-card cosplay", children: [_jsx("h3", { children: "Cosplay" }), _jsx("p", { children: "Find your perfect costume" })] }), _jsxs(Link, { to: "/category/beauty", className: "category-card beauty", children: [_jsx("h3", { children: "Beauty" }), _jsx("p", { children: "Discover beauty essentials" })] })] })] }), _jsxs("section", { className: "featured-products", children: [_jsx("h2", { children: "Featured Products" }), _jsx("div", { className: "products-grid", children: featured.map((product) => (_jsx(ProductCard, { product: product }, product.id))) })] })] }))] }));
};
export default Home;
