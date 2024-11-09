import React from 'react';
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

const Layout: React.FC = () => {
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

  return (
    <div className="layout">
      <header>
        <div className="header-content">
          <Link to="/" className="logo">
            Akameyess Shop
          </Link>
          <nav>
            <div className="nav-links">
              <Link to="/category/cosplay">Cosplay</Link>
              <Link to="/category/beauty">Beauty</Link>
              <div className="auth-buttons">
                {user ? (
                  <button onClick={handleLogout} className="nav-link-button">
                    <FaUser />
                    <div className="user-info">
                      <span className="user-name">{displayName}</span>
                      <span className="logout-text">Logout</span>
                    </div>
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowLoginModal(true)} 
                    className="nav-link-button"
                  >
                    <FaUser /> Login
                  </button>
                )}
                <button 
                  onClick={handleOpenCart} 
                  className="nav-link-button"
                >
                  <FaShoppingCart />
                </button>
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