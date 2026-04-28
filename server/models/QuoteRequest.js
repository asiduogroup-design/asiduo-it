const mongoose = require('mongoose')

const quoteRequestSchema = new mongoose.Schema(
  {
    serviceId: {
      type: String,
      trim: true,
      maxlength: 80,
      default: '',
    },
    serviceName: {
      type: String,
      trim: true,
      maxlength: 140,
      required: true,
    },
    serviceCategory: {
      type: String,
      trim: true,
      maxlength: 40,
      default: '',
    },
    estimatedQuote: {
      type: String,
      trim: true,
      maxlength: 80,
      default: '',
    },
    selectedOptions: {
      type: String,
      trim: true,
      maxlength: 400,
      default: '',
    },
    totalPrice: {
      type: String,
      trim: true,
      maxlength: 40,
      default: '',
    },
    deliveryTime: {
      type: String,
      trim: true,
      maxlength: 40,
      default: '',
    },
    name: {
      type: String,
      trim: true,
      maxlength: 120,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 40,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 160,
      required: true,
    },
    company: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '',
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1200,
      default: '',
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

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema)
