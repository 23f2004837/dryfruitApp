import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../utils/api';
import Header from '../components/Header';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const paymentMethod = location.state?.paymentMethod || 'GPay';

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: getTotalPrice(),
        paymentMethod
      };

      const response = await orderAPI.createOrder(orderData);
      clearCart();
      navigate('/order-summary', { state: { order: response.data } });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order');
      console.error('Error placing order:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <Header />
        <main className="main-content">
          <div className="container">
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button onClick={() => navigate('/')} className="back-btn">
                Go to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <h2>Checkout</h2>
          
          <div className="checkout-content">
            <div className="checkout-section">
              <h3>Delivery Details</h3>
              <div className="detail-box">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Delivery Address:</strong> Flat {user?.flatNumber}</p>
              </div>
            </div>
            
            <div className="checkout-section">
              <h3>Payment Method</h3>
              <div className="detail-box">
                <p className="payment-method-display">{paymentMethod}</p>
                <p className="payment-note">
                  After clicking "Place Order", you will be redirected to {paymentMethod} to complete the payment.
                </p>
              </div>
            </div>
            
            <div className="checkout-section">
              <h3>Order Summary</h3>
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item._id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="order-item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="order-item-price">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-total">
                <span>Total Amount:</span>
                <span className="total-amount">₹{getTotalPrice()}</span>
              </div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="checkout-actions">
              <button onClick={() => navigate('/cart')} className="back-btn">
                Back to Cart
              </button>
              <button 
                onClick={handlePlaceOrder} 
                disabled={loading}
                className="place-order-btn"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
