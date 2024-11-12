import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import './Carousel.css';
const Carousel = ({ products, title, direction = 'left' }) => {
    const containerRef = useRef(null);
    const scrollRef = useRef(0);
    const isHoveredRef = useRef(false);
    useEffect(() => {
        const scrollContainer = containerRef.current;
        if (!scrollContainer)
            return;
        const totalWidth = scrollContainer.scrollWidth;
        scrollRef.current = direction === 'left' ? 0 : totalWidth / 2;
        const scroll = () => {
            if (!scrollContainer)
                return;
            if (!isHoveredRef.current) {
                if (direction === 'left') {
                    scrollRef.current += 0.5;
                    if (scrollRef.current >= totalWidth / 2) {
                        scrollRef.current = 0;
                    }
                }
                else {
                    scrollRef.current -= 0.5;
                    if (scrollRef.current <= 0) {
                        scrollRef.current = totalWidth / 2;
                    }
                }
                scrollContainer.scrollLeft = scrollRef.current;
            }
            requestAnimationFrame(scroll);
        };
        const animationId = requestAnimationFrame(scroll);
        const handleMouseEnter = () => {
            isHoveredRef.current = true;
        };
        const handleMouseLeave = () => {
            isHoveredRef.current = false;
        };
        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            cancelAnimationFrame(animationId);
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [products, direction]);
    return (_jsxs("div", { className: "carousel-section", children: [_jsx("h2", { children: title }), _jsx("div", { className: "carousel-container", ref: containerRef, children: _jsx("div", { className: "carousel-content", children: [...products, ...products].map((product, index) => (_jsx("div", { className: "carousel-item", children: _jsx(ProductCard, { product: product }) }, `${product.id}-${index}`))) }) })] }));
};
export default Carousel;
