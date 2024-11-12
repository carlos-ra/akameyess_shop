import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Carousel from '../components/Carousel';
import SplineModel from '../components/SplineModel';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { 
  fetchFeaturedProducts, 
  fetchBeautyProducts, 
  fetchCosplayProducts 
} from '../store/slices/productsSlice';
import './Home.css';
import { Product } from '../types/product';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    featured = [], 
    beautyProducts = [], 
    cosplayProducts = [], 
    loading = false, 
    error = null 
  } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchBeautyProducts());
    dispatch(fetchCosplayProducts());
  }, [dispatch]);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Welcome to Akameyess Shop
            <span className="signature-label">by Natalia Castellanos</span>
          </h1>
          <p>Your one-stop shop for cosplay costumes and beauty products</p>
        </div>
        <div className="hero-model">
          <SplineModel />
        </div>
      </section>

      {error ? (
        <div className="error-message">{error}</div>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Carousel 
            products={beautyProducts} 
            title="Trending Beauty Products" 
            direction="left"
          />
          <Carousel 
            products={cosplayProducts} 
            title="Popular Cosplay Products" 
            direction="right"
          />
          
          <section className="featured-categories">
            <h2>Shop by Category</h2>
            <div className="category-cards">
              <Link to="/category/cosplay" className="category-card cosplay">
                <h3>Cosplay</h3>
                <p>Find your perfect costume</p>
              </Link>
              <Link to="/category/beauty" className="category-card beauty">
                <h3>Beauty</h3>
                <p>Discover beauty essentials</p>
              </Link>
            </div>
          </section>

          <section className="featured-products">
            <h2>Featured Products</h2>
            <div className="products-grid">
              {featured.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;