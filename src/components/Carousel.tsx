import React, { useEffect, useRef } from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import './Carousel.css';

interface CarouselProps {
  products: Product[];
  title: string;
  direction?: 'left' | 'right';
}

const Carousel: React.FC<CarouselProps> = ({ products, title, direction = 'left' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const totalWidth = scrollContainer.scrollWidth;
    scrollRef.current = direction === 'left' ? 0 : totalWidth / 2;

    const scroll = () => {
      if (!scrollContainer) return;
      
      if (!isHoveredRef.current) {
        if (direction === 'left') {
          scrollRef.current += 0.5;
          if (scrollRef.current >= totalWidth / 2) {
            scrollRef.current = 0;
          }
        } else {
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

  return (
    <div className="carousel-section">
      <h2>{title}</h2>
      <div className="carousel-container" ref={containerRef}>
        <div className="carousel-content">
          {[...products, ...products].map((product, index) => (
            <div key={`${product.id}-${index}`} className="carousel-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel; 