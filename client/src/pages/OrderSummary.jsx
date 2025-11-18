import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import './OrderSummary.css';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="order-summary-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p className="success-message">
              Thank you for your order. A confirmation email has been sent to {order.email}
            </p>
            
            <div className="order-details">
              <h3>Order Details</h3>
              
              <div className="detail-row">
                <span>Order ID:</span>
                <span className="detail-value">{order._id}</span>
              </div>
              
              <div className="detail-row">
                <span>Order Date:</span>
                <span className="detail-value">
                  {new Date(order.orderDate).toLocaleString()}
                </span>
              </div>
              
              <div className="detail-row">
                <span>Delivery Address:</span>
                <span className="detail-value">Flat {order.flatNumber}</span>
              </div>
              
              <div className="detail-row">
                <span>Payment Method:</span>
                <span className="detail-value">{order.paymentMethod}</span>
              </div>
              
              <div className="detail-row">
                <span>Payment Status:</span>
                <span className="detail-value status-completed">
                  {order.paymentStatus}
                </span>
              </div>
            </div>
            
            <div className="order-items-section">
              <h3>Items Ordered</h3>
              <div className="summary-items">
                {order.items.map((item, index) => (
                  <div key={index} className="summary-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="total-row">
                <span>Total Amount:</span>
                <span className="total-amount">₹{order.totalAmount}</span>
              </div>
            </div>
            
            <div className="action-buttons">
              <button onClick={() => navigate('/')} className="home-btn">
                Back to Home
              </button>
              <button onClick={() => navigate('/order-history')} className="history-btn">
                View Order History
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSummary;
