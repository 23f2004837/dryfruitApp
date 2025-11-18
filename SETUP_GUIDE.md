# Setup Guide for Dry Fruits Shopping Application

This guide will walk you through setting up and running the application locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - You can either:
  - Install locally - [Download](https://www.mongodb.com/try/download/community)
  - Use MongoDB Atlas (cloud) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd dryfruitApp
```

## Step 2: Install Dependencies

### Install Server Dependencies
```bash
cd server
npm install
cd ..
```

### Install Client Dependencies
```bash
cd client
npm install
cd ..
```

## Step 3: Set Up MongoDB

### Option A: Local MongoDB
1. Start MongoDB service:
   ```bash
   # On macOS (using brew)
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   
   # On Windows
   # MongoDB should start automatically, or start it from Services
   ```

2. Your connection string will be: `mongodb://localhost:27017/dryfruitapp`

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" and choose "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dryfruitapp`)

## Step 4: Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)

2. Create a new project or select an existing one

3. Enable Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:5000/auth/google/callback`
   - Click "Create"

5. Copy your Client ID and Client Secret

## Step 5: Configure Email (Optional)

To enable order confirmation emails:

1. Use a Gmail account
2. Enable 2-Factor Authentication on your Google account
3. Generate an App Password:
   - Go to [Google Account](https://myaccount.google.com/)
   - Security > 2-Step Verification
   - At the bottom, click "App passwords"
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password

## Step 6: Set Up Environment Variables

### Server Configuration

Create `server/.env` file:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and fill in your values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dryfruitapp
# OR for Atlas: mongodb+srv://username:password@cluster.mongodb.net/dryfruitapp

# Google OAuth2 Configuration
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Session Secret (generate a random string)
SESSION_SECRET=your_random_session_secret_at_least_32_chars

# JWT Secret (generate a random string)
JWT_SECRET=your_random_jwt_secret_at_least_32_chars

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration (optional, for order notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
```

**Tips for generating secrets:**
```bash
# Generate random secrets using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Client Configuration

Create `client/.env` file:

```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_actual_google_client_id_here
```

**Note:** Use the same Google Client ID you used in server configuration.

## Step 7: Seed the Database

Populate the database with sample products:

```bash
# From the root directory
npm run seed

# OR from the server directory
cd server
node seed.js
```

You should see: "Products seeded successfully"

## Step 8: Start the Application

You need to run both the server and client simultaneously.

### Option 1: Using Two Terminals (Recommended)

**Terminal 1 - Start the Backend Server:**
```bash
# From root directory
npm run server:dev

# OR from server directory
cd server
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB Connected: localhost
```

**Terminal 2 - Start the Frontend Client:**
```bash
# From root directory
npm run client

# OR from client directory
cd client
npm run dev
```

You should see:
```
VITE v7.2.2  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Option 2: Using Screen (Linux/Mac)

```bash
# Start server in background
screen -dmS server bash -c 'cd server && npm run dev'

# Start client in foreground
cd client && npm run dev
```

## Step 9: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the login page with "Sign in with Google" button.

## Step 10: Test the Application

1. **Login:**
   - Click "Sign in with Google"
   - Authenticate with your Google account
   - Enter your flat number (e.g., A-703 or B-2201)
   - Click "Complete Registration"

2. **Browse Products:**
   - You should see the home page with 10 dry fruit products
   - Each product displays image, name, description, and price

3. **Add to Cart:**
   - Click "Add to Cart" on any product
   - Notice the cart count in the header increases

4. **View Cart:**
   - Click the "Cart" button in the header
   - You should see your selected items
   - Try increasing/decreasing quantities
   - Try removing items

5. **Checkout:**
   - Select payment method (GPay or PhonePe)
   - Click "Proceed to Checkout"
   - Review your order details
   - Click "Place Order"

6. **Order Confirmation:**
   - You should see the order summary page
   - If email is configured, you'll receive a confirmation email
   - Click "Back to Home" to return to shopping

7. **Profile & Order History:**
   - Click on your profile picture in the header
   - Try "Profile" to see your details
   - Try "Order History" to see past orders
   - Try "Logout" to sign out

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running. Restart MongoDB service.

### Google OAuth Error
```
Error: redirect_uri_mismatch
```
**Solution:** 
- Check that the redirect URI in Google Cloud Console matches exactly: `http://localhost:5000/auth/google/callback`
- Make sure you're using the correct Client ID in both server and client .env files

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** 
- Kill the process using that port:
  ```bash
  # Find the process
  lsof -i :5000
  # Kill it
  kill -9 <PID>
  ```
- Or change the PORT in server/.env

### CORS Error in Browser
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Make sure FRONTEND_URL in server/.env matches the client URL
- Restart the server after changing .env files

### Cannot Find Module Error
```
Error: Cannot find module 'express'
```
**Solution:** Reinstall dependencies:
```bash
cd server
rm -rf node_modules package-lock.json
npm install

cd ../client
rm -rf node_modules package-lock.json
npm install
```

## Default Test Credentials

Since this uses Google OAuth, you'll need to use your own Google account. There are no default credentials.

## Production Deployment

For production deployment:

1. Build the client:
   ```bash
   cd client
   npm run build
   ```

2. Update environment variables:
   - Use production MongoDB URI
   - Use production URLs
   - Use strong secrets
   - Enable HTTPS

3. Serve the built client files from the server
4. Use a process manager like PM2 for the Node.js server
5. Set up a reverse proxy (nginx) for serving the application

## Support

If you encounter any issues:
1. Check that all environment variables are set correctly
2. Ensure MongoDB is running
3. Verify Node.js version is 18 or higher
4. Check the console for error messages
5. Review the logs from both server and client terminals

## Next Steps

- Configure real email credentials for order notifications
- Add more products through the database
- Customize the styling to match your brand
- Add additional features as needed

Happy shopping! 🥜
