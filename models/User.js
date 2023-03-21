const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a user name']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please add a email']
    },
    hashedPassword: {
      type: String,
      required: [true, 'Please add a password']
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;