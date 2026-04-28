const mongoose = require('mongoose')

const contactSalesRequestSchema = new mongoose.Schema(
  {
    targetEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 160,
      default: 'asiduogroup@gmail.com',
    },
    name: {
      type: String,
      trim: true,
      maxlength: 120,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 160,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 40,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      maxlength: 220,
      required: true,
    },
    purpose: {
      type: String,
      trim: true,
      maxlength: 1200,
      required: true,
    },
    locale: {
      type: String,
      enum: ['en', 'it'],
      default: 'en',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ContactSalesRequest', contactSalesRequestSchema)

