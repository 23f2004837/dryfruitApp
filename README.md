# Dry Fruits Shopping Application

A fully client-side static e-commerce application for selling premium dry fruits with shopping cart functionality and WhatsApp checkout integration.

## 🌐 Live Demo

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch.

**Live URL:** `https://23f2004837.github.io/dryfruitApp/`

> **Note:** After the first deployment, it may take a few minutes for the site to become available.

## Features

### 🛒 Shopping Experience
- Home page with all products displayed in a card view layout
- Vertical scrolling product catalog
- One-click add to cart functionality
- Cart with quantity management
- Real-time cart updates (stored in browser localStorage)

### 📦 Products
- Products loaded from static JSON file (`products.json`)
- Premium dry fruits including almonds, cashews, pistachios, and more
- High-quality product images from Unsplash

### 💬 WhatsApp Checkout
- Client-side checkout with no server interaction
- Order summary automatically formatted for WhatsApp
- One-click sharing to WhatsApp with order details including:
  - Product names and quantities
  - Individual and total prices
  - Tax calculation (5%)
  - Optional delivery address
- Opens WhatsApp in a new window for easy order sharing

### 📱 Fully Static & Client-Side
- No authentication required - open to all users
- No backend server needed
- No database - all data from static JSON
- Cart stored in browser localStorage
- Works entirely in the browser

## Tech Stack

### Frontend
- React 19 - Modern UI library
- React Router DOM - Client-side routing
- Context API - State management (cart, auth stub)
- Vite - Fast build tooling and development server
- Pure CSS - Minimal styling without external frameworks

### Data & Storage
- Static JSON file (`products.json`) - Product data
- Browser localStorage - Shopping cart persistence
- No backend server required
- No database required

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

### 1. Clone the Repository
```bash
git clone https://github.com/23f2004837/dryfruitApp.git
cd dryfruitApp
```

### 2. Install Dependencies

```bash
cd client
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at: http://localhost:5173

### 4. Build for Production

```bash
npm run build
```

The build files will be in `client/dist/` directory.

## How Checkout Works

1. **Browse Products**: View all available dry fruits on the home page
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart button in the header to review your items
4. **Adjust Quantities**: Use +/- buttons to change quantities or remove items
5. **Checkout**: Click "Proceed to Checkout"
6. **Enter Address** (Optional): Add your delivery address in the checkout form
7. **Place Order**: Click "Place Order via WhatsApp"
8. **WhatsApp Opens**: A new window opens with your order pre-formatted
9. **Send Order**: Choose a recipient in WhatsApp and send your order
10. **Confirmation**: You'll see a local confirmation page

### Order Message Format

The WhatsApp message includes:
- Product names and quantities
- Individual prices per line item
- Subtotal
- Tax (5%)
- Total amount
- Delivery address (if provided)

Example:
```
Order from DryfruitApp:

- Almonds x2 — ₹1198.00
- Cashews x1 — ₹699.00

Subtotal: ₹1897.00
Tax (5%): ₹94.85
Total: ₹1991.85

Delivery address: 123 Main St, City
```

## Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment
- Push changes to the `main` branch
- GitHub Actions workflow builds the client
- Static files are published to GitHub Pages
- Site is available at: `https://23f2004837.github.io/dryfruitApp/`

### Manual Deployment
If you want to deploy to your own GitHub Pages:

1. Fork this repository
2. Go to Settings > Pages
3. Set Source to "GitHub Actions"
4. Push changes to main branch
5. The workflow will automatically deploy

### Deployment Configuration

The `.github/workflows/deploy.yml` workflow:
- Triggers on push to main branch
- Installs Node.js dependencies
- Builds the React application
- Deploys to GitHub Pages

## Product Data

Products are defined in `client/public/products.json`. To modify products:

1. Edit the JSON file
2. Each product requires:
   - `id`: Unique identifier (string)
   - `name`: Product name
   - `description`: Product description
   - `price`: Price in rupees (number)
   - `image`: Image URL (from Unsplash or your own)

3. Rebuild and redeploy

## Local Storage

The application uses browser localStorage for:
- **Shopping Cart**: Persists cart items between sessions
- Cart data is stored as JSON in localStorage with key `cart`
- Cart data is automatically synchronized with the CartContext

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Requires localStorage support

## Future Enhancements

- Product search and filtering
- Product categories
- Product ratings and reviews
- Multiple images per product
- Wishlist functionality
- Responsive mobile design improvements

## License

ISC

## Support

For issues and questions, please create an issue in the repository.