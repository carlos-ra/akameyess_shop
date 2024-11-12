import React from 'react';
import { Product } from '../types/product';
import './CartButton.css';
interface CartButtonProps {
    product: Product;
    className?: string;
}
export declare const CartButton: React.FC<CartButtonProps>;
export {};
