import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo" onClick={() => navigate('/')}>
            🥜 Dry Fruits Shop
          </h1>
        </div>
        
        <div className="header-right">
          {user && (
            <>
              <button className="cart-button" onClick={() => navigate('/cart')}>
                🛒 Cart ({getTotalItems()})
              </button>
              
              <div className="user-menu" ref={dropdownRef}>
                <img
                  src={user.photo || 'https://via.placeholder.com/40'}
                  alt="User"
                  className="user-avatar"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={() => { navigate('/profile'); setShowDropdown(false); }}>
                      Profile
                    </button>
                    <button onClick={() => { navigate('/order-history'); setShowDropdown(false); }}>
                      Order History
                    </button>
                    <button onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
