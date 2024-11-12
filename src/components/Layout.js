import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, Link } from 'react-router-dom';
import { FaInstagram, FaTiktok, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { signOut } from '../store/slices/authSlice';
import { toggleCart } from '../store/slices/cartSlice';
import SearchBar from './SearchBar';
import { CartDrawer } from './CartDrawer';
import { LoginModal } from './LoginModal';
import { useLoginModal } from '../contexts/LoginModalContext';
import './Layout.css';
const Layout = () => {
    const { user } = useAppSelector(state => state.auth);
    const { showLoginModal, setShowLoginModal } = useLoginModal();
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(signOut());
    };
    const handleOpenCart = () => {
        dispatch(toggleCart());
    };
    const displayName = user?.displayName || user?.email?.split('@')[0] || '';
    return (_jsxs("div", { className: "layout", children: [_jsx("header", { children: _jsxs("div", { className: "header-content", children: [_jsx(Link, { to: "/", className: "logo", children: "Akameyess Shop" }), _jsxs("nav", { children: [_jsxs("div", { className: "nav-links", children: [_jsx(Link, { to: "/category/cosplay", children: "Cosplay" }), _jsx(Link, { to: "/category/beauty", children: "Beauty" }), _jsxs("div", { className: "auth-buttons", children: [user ? (_jsxs("button", { onClick: handleLogout, className: "nav-link-button", children: [_jsx(FaUser, {}), _jsxs("div", { className: "user-info", children: [_jsx("span", { className: "user-name", children: displayName }), _jsx("span", { className: "logout-text", children: "Logout" })] })] })) : (_jsxs("button", { onClick: () => setShowLoginModal(true), className: "nav-link-button", children: [_jsx(FaUser, {}), " Login"] })), _jsx("button", { onClick: handleOpenCart, className: "nav-link-button", children: _jsx(FaShoppingCart, {}) })] })] }), _jsx(SearchBar, {})] })] }) }), _jsx("main", { className: "main-content", children: _jsx("div", { className: "container", children: _jsx(Outlet, {}) }) }), _jsx("footer", { children: _jsxs("div", { className: "footer-content", children: [_jsxs("div", { className: "social-links", children: [_jsxs("a", { href: "https://www.instagram.com/akameyess", target: "_blank", rel: "noopener noreferrer", className: "social-link", children: [_jsx(FaInstagram, {}), " @akameyess"] }), _jsxs("a", { href: "https://www.tiktok.com/@akameyess", target: "_blank", rel: "noopener noreferrer", className: "social-link", children: [_jsx(FaTiktok, {}), " @akameyess"] })] }), _jsx("p", { children: "\u00A9 2024 Akameyess Shop. All rights reserved." })] }) }), _jsx(CartDrawer, {}), showLoginModal && (_jsx(LoginModal, { onClose: () => setShowLoginModal(false) }))] }));
};
export default Layout;
