import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Pagination.css';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (_jsxs("div", { className: "pagination", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => onPageChange(currentPage - 1), children: "Previous" }), pages.map(page => (_jsx("button", { className: `pagination-btn ${currentPage === page ? 'active' : ''}`, onClick: () => onPageChange(page), children: page }, page))), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => onPageChange(currentPage + 1), children: "Next" })] }));
};
export default Pagination;
