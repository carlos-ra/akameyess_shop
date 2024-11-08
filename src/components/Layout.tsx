import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import SearchBar from './SearchBar';
import './Layout.css';

const Layout: React.FC = () => {
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
    </div>
  );
};

export default Layout; 