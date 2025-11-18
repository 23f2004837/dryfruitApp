# Quick Start Guide

Get the Dry Fruits Shopping Application running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- MongoDB running (local or Atlas)
- Google OAuth credentials (see below)

## 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies  
cd ../client
npm install
```

## 2. Quick Configuration

### Server Environment (server/.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dryfruitapp

# Get from Google Cloud Console
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Generate random strings
SESSION_SECRET=any_random_32_char_string
JWT_SECRET=any_random_32_char_string

FRONTEND_URL=http://localhost:5173

# Optional for email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Client Environment (client/.env)
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 3. Google OAuth Setup (2 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable Google+ API
3. Create OAuth client ID (Web application)
4. Add redirect URI: `http://localhost:5000/auth/google/callback`
5. Copy Client ID and Secret to .env files

## 4. Seed Database

```bash
cd server
node seed.js
```

Expected output: "Products seeded successfully"

## 5. Start Application

**Terminal 1 (Server):**
```bash
cd server
npm run dev
```

**Terminal 2 (Client):**
```bash
cd client
npm run dev
```

## 6. Access Application

Open browser: **http://localhost:5173**

## Test the App

1. Click "Sign in with Google"
2. Login with your Google account
3. Enter flat number: `A-703`
4. Browse products and add to cart
5. Checkout and place order
6. View order summary

## Troubleshooting

### MongoDB not connecting?
```bash
# Check if MongoDB is running
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port already in use?
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### Google OAuth not working?
- Check Client ID matches in both .env files
- Verify redirect URI is exactly `http://localhost:5000/auth/google/callback`
- Make sure Google+ API is enabled

## Quick Commands

```bash
# From root directory
npm run server:dev    # Start server
npm run client       # Start client
npm run seed         # Seed database

# Build for production
cd client && npm run build
```

## Default Setup

- **Server**: http://localhost:5000
- **Client**: http://localhost:5173
- **Database**: mongodb://localhost:27017/dryfruitapp
- **Products**: 10 dry fruits seeded automatically

## Need Help?

- Check SETUP_GUIDE.md for detailed instructions
- Check FEATURES.md for feature documentation
- Check README.md for project overview

Happy coding! 🚀
