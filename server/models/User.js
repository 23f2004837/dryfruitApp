import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String
  },
  flatNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Validate format like A-703 or B-2201
        return /^[A-Z]-\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid flat number format! Use format like A-703 or B-2201`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);
