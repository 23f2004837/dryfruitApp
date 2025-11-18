# Dry Fruits Shopping Application

A full-stack e-commerce application for selling premium dry fruits with Google OAuth authentication, shopping cart functionality, and integrated payment options.

## Features

### User Authentication
- Google OAuth2 login integration
- User registration with flat number collection (format: A-703, B-2201)
- Secure JWT-based authentication

### User Profile
- Profile dropdown menu with options:
  - Profile
  - Order History
  - Logout

### Shopping Experience
- Home page with all products displayed in a card view layout
- Vertical scrolling product catalog
- One-click add to cart functionality
- Cart with quantity management
- Real-time cart updates

### Checkout & Payment
- UPI payment integration (GPay and PhonePe options)
- Secure checkout process
- Order summary display

### Order Management
- Order confirmation emails sent to user's Gmail
- Order history tracking
- Detailed order summaries
- Navigation back to home after order completion

## Tech Stack

### Frontend
- React 19
- React Router DOM for navigation
- Axios for API calls
- Context API for state management
- Vite for build tooling

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- Passport.js for OAuth authentication
- JWT for session management
- Nodemailer for email notifications

## Project Structure

```
dryfruitApp/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── index.js          # Server entry point
│   └── seed.js           # Database seeding script
└── package.json          # Root package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google OAuth credentials

### 1. Clone the Repository
```bash
git clone <repository-url>
cd dryfruitApp
```

### 2. Configure Environment Variables

#### Server Environment (.env in server directory)
Create `server/.env` file based on `server/.env.example`:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/dryfruitapp

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

SESSION_SECRET=your_session_secret_key_here
JWT_SECRET=your_jwt_secret_key_here

FRONTEND_URL=http://localhost:5173

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

#### Client Environment (.env in client directory)
Create `client/.env` file based on `client/.env.example`:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Seed Database with Products

```bash
# From root directory
npm run seed
```

### 5. Start the Application

#### Option 1: Run separately
```bash
# Terminal 1 - Start server
npm run server:dev

# Terminal 2 - Start client
npm run client
```

#### Option 2: Run from respective directories
```bash
# In server directory
npm run dev

# In client directory
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback`
6. Copy Client ID and Client Secret to environment variables

## Email Configuration

To enable order confirmation emails:

1. Use a Gmail account
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
4. Use this app password in `EMAIL_PASS` environment variable

## API Endpoints

### Authentication
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - OAuth callback
- `POST /auth/complete-registration` - Complete registration with flat number
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/history` - Get user's order history
- `GET /api/orders/:id` - Get single order

## Database Models

### User
- googleId (required, unique)
- email (required, unique)
- photo
- flatNumber (required, format: A-703)
- createdAt

### Product
- name (required)
- description (required)
- price (required)
- image (required)
- category
- inStock

### Order
- userId (ref: User)
- items (array of products with quantity)
- totalAmount
- paymentMethod (GPay/PhonePe)
- paymentStatus
- flatNumber
- email
- orderDate

## Building for Production

### Build Client
```bash
cd client
npm run build
```

The build files will be in `client/dist/`

### Environment Variables for Production
Update environment variables for production URLs and credentials.

## Security Considerations

- JWT secrets should be strong and unique
- Use HTTPS in production
- Store sensitive credentials in environment variables
- Implement rate limiting for API endpoints
- Validate all user inputs
- Use secure session configuration

## Future Enhancements

- Admin dashboard for product management
- Real payment gateway integration
- Order tracking system
- Product search and filtering
- User reviews and ratings
- Wishlist functionality
- Promotional codes and discounts

## License

ISC

## Support

For issues and questions, please create an issue in the repository.