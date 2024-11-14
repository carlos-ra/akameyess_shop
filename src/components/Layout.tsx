import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FaInstagram, FaTiktok, FaUser, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { signOut } from '../store/slices/authSlice';
import { toggleCart } from '../store/slices/cartSlice';
import SearchBar from './SearchBar';
import { CartDrawer } from './CartDrawer';
import { LoginModal } from './LoginModal';
import { useLoginModal } from '../contexts/LoginModalContext';
import './Layout.css';

const Layout: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const { items } = useAppSelector(state => state.cart);
  const { showLoginModal, setShowLoginModal } = useLoginModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCartDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(signOut());
  };

  const handleCartClick = () => {
    setShowCartDropdown(!showCartDropdown);
  };

  const handleOpenCart = () => {
    setShowCartDropdown(false);
    dispatch(toggleCart());
  };

  const handleViewOrders = () => {
    setShowCartDropdown(false);
    navigate('/orders');
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || '';

  return (
    <div className="layout">
      <header>
        <div className="header-content">
          <Link to="/" className="logo">
            Akameyess
          </Link>
          <nav>
            <div className="nav-links">
              <Link to="/category/cosplay">Cosplay</Link>
              <Link to="/category/beauty">Beauty</Link>
              <div className="auth-buttons">
                {user ? (
                  <>
                    <button onClick={handleLogout} className="nav-link-button">
                      <FaUser />
                      <div className="user-info">
                        <span className="user-name">{displayName}</span>
                        <span className="logout-text">Logout</span>
                      </div>
                    </button>
                    <div className="cart-dropdown" ref={dropdownRef}>
                      <button 
                        onClick={handleCartClick} 
                        className="nav-link-button"
                      >
                        <FaShoppingCart />
                        {items.length > 0 && (
                          <span className="cart-count">{items.length}</span>
                        )}
                      </button>
                      {showCartDropdown && (
                        <div className="dropdown-menu">
                          <button onClick={handleOpenCart}>
                            <FaShoppingCart /> View Cart
                          </button>
                          <button onClick={handleViewOrders}>
                            <FaClipboardList /> My Orders
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <button 
                    onClick={() => setShowLoginModal(true)} 
                    className="nav-link-button"
                  >
                    <FaUser /> Login
                  </button>
                )}
              </div>
            </div>
            <SearchBar />
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer>
        <div className="footer-content">
          <div className="social-links">
            <a 
              href="https://www.instagram.com/akameyess" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaInstagram /> @akameyess
            </a>
            <a 
              href="https://www.tiktok.com/@akameyess" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaTiktok /> @akameyess
            </a>
          </div>
          <p>&copy; 2024 Akameyess Shop. All rights reserved.</p>
        </div>
      </footer>

      <CartDrawer />
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default Layout;