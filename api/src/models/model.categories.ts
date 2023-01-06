import mongoose, { Document } from 'mongoose'
import validator from 'validator'

export type CategoryDocument = Document & {
  id: number
  name: string
  slug: string
  
}

const categorySchema = new mongoose.Schema({
  id: {
    type: Number,
    index: true,
  },

  name: {
    type: String,
    required: [true, 'Please enter category name'],
    
    //index: true,
    trim: true,
  },

  slug: {
    type: String,
    lowercase: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<CategoryDocument>('Category', categorySchema)
