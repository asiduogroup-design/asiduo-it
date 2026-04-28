require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')
const axios = require('axios')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const QuoteRequest = require('./models/QuoteRequest')
const ContactSalesRequest = require('./models/ContactSalesRequest')

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
const normalizeContactName = (value) => String(value || '').trim().slice(0, 120)
const normalizeContactPhone = (value) =>
  String(value || '')
    .trim()
    .replace(/[^\d+\-\s()]/g, '')
    .slice(0, 40)
const normalizeContactCompany = (value) => String(value || '').trim().slice(0, 120)
const normalizeContactMessage = (value) => String(value || '').trim().slice(0, 1200)
const normalizeContactAddress = (value) => String(value || '').trim().slice(0, 220)
const normalizeLocale = (value) => (String(value || '').trim().toLowerCase() === 'it' ? 'it' : 'en')
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
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''))
const CONTACT_SALES_TO_EMAIL = normalizeEmail(process.env.CONTACT_SALES_TO_EMAIL || 'asiduogroup@gmail.com')
const CONTACT_SALES_FROM_EMAIL = normalizeEmail(process.env.CONTACT_SALES_FROM_EMAIL || process.env.CONTACT_SALES_GMAIL_USER || CONTACT_SALES_TO_EMAIL)
const CONTACT_SALES_GMAIL_USER = normalizeEmail(process.env.CONTACT_SALES_GMAIL_USER)
const CONTACT_SALES_GMAIL_APP_PASSWORD = String(process.env.CONTACT_SALES_GMAIL_APP_PASSWORD || '').trim()
const CONTACT_SALES_SMTP_HOST = String(process.env.CONTACT_SALES_SMTP_HOST || '').trim()
const CONTACT_SALES_SMTP_PORT = Number(process.env.CONTACT_SALES_SMTP_PORT || 587)
const CONTACT_SALES_SMTP_SECURE = String(process.env.CONTACT_SALES_SMTP_SECURE || '').trim().toLowerCase() === 'true'
const CONTACT_SALES_SMTP_USER = normalizeEmail(process.env.CONTACT_SALES_SMTP_USER)
const CONTACT_SALES_SMTP_PASS = String(process.env.CONTACT_SALES_SMTP_PASS || '').trim()
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

const createContactSalesMailer = () => {
  if (CONTACT_SALES_GMAIL_USER && CONTACT_SALES_GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: CONTACT_SALES_GMAIL_USER,
        pass: CONTACT_SALES_GMAIL_APP_PASSWORD,
      },
    })
  }

  if (CONTACT_SALES_SMTP_HOST && CONTACT_SALES_SMTP_USER && CONTACT_SALES_SMTP_PASS) {
    return nodemailer.createTransport({
      host: CONTACT_SALES_SMTP_HOST,
      port: Number.isFinite(CONTACT_SALES_SMTP_PORT) ? CONTACT_SALES_SMTP_PORT : 587,
      secure: CONTACT_SALES_SMTP_SECURE,
      auth: {
        user: CONTACT_SALES_SMTP_USER,
        pass: CONTACT_SALES_SMTP_PASS,
      },
    })
  }

  return null
}

const contactSalesMailer = createContactSalesMailer()

if (contactSalesMailer) {
  contactSalesMailer
    .verify()
    .then(() => {
      console.log('Contact sales mailer is configured.')
    })
    .catch((error) => {
      console.error('Contact sales mailer verification failed:', error.message)
    })
} else {
  console.warn('Contact sales mailer is not configured. Set CONTACT_SALES_GMAIL_* or CONTACT_SALES_SMTP_* variables.')
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

/* ================= QUOTATIONS ================= */

app.post('/api/quotations', async (req, res) => {
  try {
    const serviceId = String(req.body?.serviceId || '').trim().slice(0, 80)
    const serviceName = normalizeServiceName(req.body?.serviceName)
    const serviceCategory = String(req.body?.serviceCategory || '').trim().slice(0, 40)
    const estimatedQuote = String(req.body?.estimatedQuote || '').trim().slice(0, 80)
    const selectedOptions = String(req.body?.selectedOptions || '').trim().slice(0, 400)
    const totalPrice = String(req.body?.totalPrice || '').trim().slice(0, 40)
    const deliveryTime = String(req.body?.deliveryTime || '').trim().slice(0, 40)
    const name = normalizeContactName(req.body?.name)
    const phone = normalizeContactPhone(req.body?.phone)
    const email = normalizeEmail(req.body?.email)
    const company = normalizeContactCompany(req.body?.company)
    const message = normalizeContactMessage(req.body?.message)
    const locale = normalizeLocale(req.body?.locale)

    if (!serviceName || !name || !phone || !email) {
      return res.status(400).json({ error: 'Service, name, phone, and email are required.' })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }

    const quoteRequest = new QuoteRequest({
      serviceId,
      serviceName,
      serviceCategory,
      estimatedQuote,
      selectedOptions,
      totalPrice,
      deliveryTime,
      name,
      phone,
      email,
      company,
      message,
      locale,
    })

    await quoteRequest.save()

    res.status(201).json({
      message: 'Quotation request submitted successfully.',
      requestId: quoteRequest._id,
    })
  } catch (error) {
    console.error('Quotation request failed:', error)
    res.status(500).json({ error: 'Unable to submit quotation request right now.' })
  }
})

app.post('/api/contact-sales', async (req, res) => {
  try {
    const targetEmail = CONTACT_SALES_TO_EMAIL
    const name = normalizeContactName(req.body?.name)
    const email = normalizeEmail(req.body?.email)
    const phone = normalizeContactPhone(req.body?.phone)
    const address = normalizeContactAddress(req.body?.address)
    const purpose = normalizeContactMessage(req.body?.purpose)
    const locale = normalizeLocale(req.body?.locale)

    if (!name || !email || !phone || !address || !purpose) {
      return res.status(400).json({ error: 'Name, email, phone, address, and purpose are required.' })
    }

    if (!isValidEmail(email) || !isValidEmail(targetEmail)) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }

    if (!contactSalesMailer) {
      return res.status(500).json({
        code: 'CONTACT_SALES_EMAIL_NOT_CONFIGURED',
        error:
          'Contact sales email is not configured on server. Add CONTACT_SALES_GMAIL_USER and CONTACT_SALES_GMAIL_APP_PASSWORD (or SMTP settings).',
      })
    }

    const contactSalesRequest = new ContactSalesRequest({
      targetEmail,
      name,
      email,
      phone,
      address,
      purpose,
      locale,
    })

    await contactSalesRequest.save()

    const emailSubject = `Contact Sales Request - ${name}`
    const emailText = [
      'Contact Sales Request',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Contact Number: ${phone}`,
      `Address: ${address}`,
      `Purpose of Contact: ${purpose}`,
      `Locale: ${locale}`,
      `Request ID: ${contactSalesRequest._id}`,
    ].join('\n')

    try {
      await contactSalesMailer.sendMail({
        from: CONTACT_SALES_FROM_EMAIL || targetEmail,
        to: targetEmail,
        replyTo: email,
        subject: emailSubject,
        text: emailText,
      })
    } catch (emailError) {
      console.error('Contact sales email delivery failed:', emailError)
      return res.status(502).json({
        code: 'CONTACT_SALES_EMAIL_DELIVERY_FAILED',
        error: 'Email delivery failed. Please check mail configuration and try again.',
      })
    }

    res.status(201).json({
      message: 'Details sent to team. Reach you soon.',
      requestId: contactSalesRequest._id,
    })
  } catch (error) {
    console.error('Contact sales request failed:', error)
    res.status(500).json({ error: 'Unable to send contact details right now.' })
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
