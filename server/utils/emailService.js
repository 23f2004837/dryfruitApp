import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export const sendOrderConfirmation = async (order) => {
  try {
    const transporter = createTransporter();
    
    const itemsList = order.items
      .map(item => `${item.name} - Quantity: ${item.quantity} - ₹${item.price * item.quantity}`)
      .join('\n');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: order.email,
      subject: 'Order Confirmation - Dry Fruits Shop',
      html: `
        <h2>Thank you for your order!</h2>
        <h3>Order Details:</h3>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
        <p><strong>Delivery Address:</strong> Flat ${order.flatNumber}</p>
        
        <h3>Items:</h3>
        <ul>
          ${order.items.map(item => `
            <li>${item.name} - Quantity: ${item.quantity} - ₹${item.price * item.quantity}</li>
          `).join('')}
        </ul>
        
        <h3>Payment Details:</h3>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
        <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
        
        <p>Your order will be delivered to your flat soon!</p>
        <p>Thank you for shopping with us!</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
