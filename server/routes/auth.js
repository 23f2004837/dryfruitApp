import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Google OAuth login
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

// Google OAuth callback
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false 
  }),
  async (req, res) => {
    try {
      const profile = req.user;
      
      // Check if user exists
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        // New user - redirect to complete registration with flat number
        const tempToken = jwt.sign(
          {
            googleId: profile.id,
            email: profile.emails[0].value,
            photo: profile.photos[0]?.value
          },
          process.env.JWT_SECRET,
          { expiresIn: '15m' }
        );
        
        return res.redirect(`${process.env.FRONTEND_URL}/complete-registration?token=${tempToken}`);
      }
      
      // Existing user - create JWT and redirect to home
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
  }
);

// Complete registration with flat number
router.post('/complete-registration', async (req, res) => {
  try {
    const { token, flatNumber } = req.body;
    
    if (!token || !flatNumber) {
      return res.status(400).json({ error: 'Token and flat number are required' });
    }
    
    // Verify temp token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Create new user
    const user = await User.create({
      googleId: decoded.googleId,
      email: decoded.email,
      photo: decoded.photo,
      flatNumber
    });
    
    // Create permanent JWT
    const authToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ token: authToken, user: { email: user.email, photo: user.photo, flatNumber: user.flatNumber } });
  } catch (error) {
    console.error('Complete registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-googleId');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
