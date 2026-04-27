require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')
const axios = require('axios')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

const app = express()
const SERVICE_PRICING_INR = Object.freeze({
  domain_renewal: 700,
  new_domain: 1200,
  website_design: 15000,
  seo_service: 8000,
  photoshop: 2500,
})

const PORT = Number(process.env.PORT) || 5000
const JWT_SECRET = process.env.JWT_SECRET
const MONGO_URL = process.env.MONGO_URL
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET
const CORS_ORIGINS = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

if (!JWT_SECRET || !MONGO_URL) {
  console.error('Missing required environment variables: JWT_SECRET and/or MONGO_URL')
  process.exit(1)
}

const developmentAllowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]
const defaultAllowedOrigins = [
  'https://asiduo.com',
  'https://www.asiduo.com',
  ...(process.env.NODE_ENV === 'production' ? [] : developmentAllowedOrigins),
]
const allowedOrigins = CORS_ORIGINS.length > 0 ? CORS_ORIGINS : defaultAllowedOrigins

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const normalizeEmail = (value) => String(value || '').trim().toLowerCase()
const normalizePassword = (value) => String(value || '')
const normalizeServiceName = (value) => String(value || 'General Service').trim().slice(0, 60)
const normalizeServiceKey = (value) => {
  const cleaned = String(value || 'general_service')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_\s-]/g, '')
    .replace(/\s+/g, '_')
    .slice(0, 40)

  return cleaned || 'general_service'
}
const isPositiveNumber = (value) => Number.isFinite(value) && value > 0
const hasRazorpayCredentials = () => Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET)
const formatRazorpayError = (error, fallbackMessage) => {
  const messageFromApi = error.response?.data?.error?.description
  return String(messageFromApi || fallbackMessage)
}
const signRazorpayPayload = (orderId, paymentId) =>
  crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')
const isSameSignature = (expectedSignature, actualSignature) => {
  const expectedBuffer = Buffer.from(String(expectedSignature), 'utf8')
  const actualBuffer = Buffer.from(String(actualSignature), 'utf8')

  if (expectedBuffer.length !== actualBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(expectedBuffer, actualBuffer)
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true)
      return
    }

    const isAllowedOrigin = allowedOrigins.includes(origin)
    const isVercelPreview = /^https:\/\/.+\.vercel\.app$/.test(origin)

    if (isAllowedOrigin || isVercelPreview) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}

app.set('trust proxy', 1)
app.use(helmet())
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
)
app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running')
})

/* ================= REGISTER ================= */

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body

  try {
    const normalizedEmail = normalizeEmail(email)
    const normalizedPassword = normalizePassword(password)

    if (!normalizedEmail || !normalizedPassword) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const existingUser = await User.findOne({
      email: { $regex: `^${escapeRegex(normalizedEmail)}$`, $options: 'i' },
    })

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(normalizedPassword, 10)

    const user = new User({
      email: normalizedEmail,
      password: hashedPassword,
    })

    await user.save()

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'User registered',
      token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

/* ================= LOGIN ================= */

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const normalizedEmail = normalizeEmail(email)
    const normalizedPassword = normalizePassword(password)

    if (!normalizedEmail || !normalizedPassword) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({
      email: { $regex: `^${escapeRegex(normalizedEmail)}$`, $options: 'i' },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    let match = false
    const storedPassword = String(user.password || '')
    const isBcryptHash = /^\$2[abxy]?\$\d{2}\$/.test(storedPassword)

    if (isBcryptHash) {
      match = await bcrypt.compare(normalizedPassword, storedPassword)
    } else {
      // Backward-compatible login for legacy users whose passwords were stored
      // before bcrypt hashing was introduced.
      match = normalizedPassword === storedPassword

      if (match) {
        user.password = await bcrypt.hash(normalizedPassword, 10)
        await user.save()
      }
    }

    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful',
      token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

/* ================= RAZORPAY ================= */

app.post('/api/payments/razorpay/order', async (req, res) => {
  if (!hasRazorpayCredentials()) {
    return res.status(500).json({
      error: 'Razorpay is not configured on the server. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.',
    })
  }

  const serviceName = normalizeServiceName(req.body?.serviceName)
  const serviceKey = normalizeServiceKey(req.body?.serviceKey || serviceName)
  const configuredServiceAmount = Number(SERVICE_PRICING_INR[serviceKey])
  const requestedAmountInRupees = Number(req.body?.amountInRupees)
  const amountInRupees = isPositiveNumber(configuredServiceAmount)
    ? configuredServiceAmount
    : requestedAmountInRupees
  const amountInSubunits = Math.round(amountInRupees * 100)

  if (!isPositiveNumber(amountInRupees) || amountInSubunits < 100) {
    return res.status(400).json({
      error: 'Invalid amount. Enter an amount of at least 1 INR.',
    })
  }

  const normalizedReceipt = String(req.body?.receipt || `${serviceKey}_${Date.now()}`)
    .replace(/\s+/g, '_')
    .slice(0, 40)
  const orderPayload = {
    amount: amountInSubunits,
    currency: 'INR',
    receipt: normalizedReceipt || `rcpt_${Date.now()}`.slice(0, 40),
    notes: {
      source: 'asiduo-solutions-web',
      service_key: serviceKey,
      service_name: serviceName,
    },
  }

  try {
    const razorpayResponse = await axios.post(
      'https://api.razorpay.com/v1/orders',
      orderPayload,
      {
        auth: {
          username: RAZORPAY_KEY_ID,
          password: RAZORPAY_KEY_SECRET,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    res.json({
      keyId: RAZORPAY_KEY_ID,
      order: razorpayResponse.data,
    })
  } catch (error) {
    console.error('Razorpay order creation failed:', error.response?.data || error.message)
    res.status(error.response?.status || 502).json({
      error: formatRazorpayError(error, 'Unable to create Razorpay order.'),
    })
  }
})

app.post('/api/payments/razorpay/verify', async (req, res) => {
  if (!hasRazorpayCredentials()) {
    return res.status(500).json({
      error: 'Razorpay is not configured on the server. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.',
    })
  }

  const {
    orderId,
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
  } = req.body || {}

  if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return res.status(400).json({
      error: 'Missing required payment verification fields.',
    })
  }

  if (orderId !== razorpayOrderId) {
    return res.status(400).json({
      error: 'Order mismatch. Please retry payment.',
    })
  }

  const expectedSignature = signRazorpayPayload(orderId, razorpayPaymentId)
  const isAuthentic = isSameSignature(expectedSignature, razorpaySignature)

  if (!isAuthentic) {
    return res.status(400).json({
      error: 'Invalid payment signature.',
    })
  }

  try {
    const paymentResponse = await axios.get(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(razorpayPaymentId)}`,
      {
        auth: {
          username: RAZORPAY_KEY_ID,
          password: RAZORPAY_KEY_SECRET,
        },
      }
    )

    const paymentData = paymentResponse.data || {}

    res.json({
      verified: true,
      paymentId: razorpayPaymentId,
      orderId,
      status: paymentData.status || 'unknown',
      method: paymentData.method || null,
    })
  } catch (error) {
    console.error('Razorpay payment fetch failed:', error.response?.data || error.message)
    res.json({
      warning: formatRazorpayError(error, 'Payment signature verified, but payment status fetch failed.'),
      verified: true,
      paymentId: razorpayPaymentId,
      orderId,
      status: 'unknown',
      method: null,
    })
  }
})

/* ================= MONGODB ================= */

mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
