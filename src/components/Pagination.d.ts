import React from 'react';
import './Pagination.css';
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
