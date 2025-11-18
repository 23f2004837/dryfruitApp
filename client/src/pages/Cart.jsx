import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('GPay');
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    navigate('/checkout', { state: { paymentMethod } });
  };

  return (
    <div className="cart-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <h2>Shopping Cart</h2>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button onClick={() => navigate('/')} className="continue-shopping-btn">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item._id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-price">₹{item.price}</p>
                    </div>
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                    <div className="item-total">
                      ₹{item.price * item.quantity}
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <h3>Order Summary</h3>
                
                <div className="payment-method-selection">
                  <h4>Select Payment Method</h4>
                  <div className="payment-options">
                    <label className={paymentMethod === 'GPay' ? 'active' : ''}>
                      <input
                        type="radio"
                        name="payment"
                        value="GPay"
                        checked={paymentMethod === 'GPay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>GPay</span>
                    </label>
                    <label className={paymentMethod === 'PhonePe' ? 'active' : ''}>
                      <input
                        type="radio"
                        name="payment"
                        value="PhonePe"
                        checked={paymentMethod === 'PhonePe'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>PhonePe</span>
                    </label>
                  </div>
                </div>
                
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery:</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                
                <button onClick={handleCheckout} className="checkout-btn">
                  Proceed to Checkout
                </button>
                
                <button onClick={() => navigate('/')} className="continue-shopping-link">
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
