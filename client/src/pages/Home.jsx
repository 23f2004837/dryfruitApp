import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productAPI } from '../utils/api';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="home-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="hero-section">
            <h2>Premium Quality Dry Fruits</h2>
            <p>Fresh, nutritious, and delivered to your doorstep</p>
          </div>
          
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
