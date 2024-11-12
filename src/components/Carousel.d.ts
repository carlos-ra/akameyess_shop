import React from 'react';
import { Product } from '../types/product';
import './Carousel.css';
interface CarouselProps {
    products: Product[];
    title: string;
    direction?: 'left' | 'right';
}
declare const Carousel: React.FC<CarouselProps>;
export default Carousel;
