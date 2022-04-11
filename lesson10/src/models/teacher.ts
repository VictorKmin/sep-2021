import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const teacherSchema = new Schema({
  name: {
    type: String,
    trim: true
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true
  },

  age: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const teacherModel = model('teacher', teacherSchema);
