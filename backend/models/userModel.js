import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, 'Username must be at least 3 characters.'],
    maxLength: [30, 'Username cannot exceed 30 characters.'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default: 'default.png',
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usertask',
    },
  ],

  isVerified: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model('user', userSchema)
