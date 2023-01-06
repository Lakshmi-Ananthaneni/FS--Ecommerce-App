import mongoose, { Document } from 'mongoose'
export interface UserDocument extends Document {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: number;
  token: string;
  isVerify: number;
}

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, 'Please enter your Firstname'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  lastname: {
    type: String,
    required: [true, 'Please enter your Lastname'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your Email'],
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please enter your Phone Number'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your Password'],
    minLength: [8, 'Password should be greater than 8 characters'],
  },
  isAdmin:
  {
    type: Number,
    default: 0,
  } ,
  isVerify: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
