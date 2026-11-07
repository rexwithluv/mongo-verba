import MongoStore from 'connect-mongo'
import express from 'express'
import session from 'express-session'
import { isValidObjectId } from 'mongoose'

import { createAuthRouter, isAuthenticated, requireAuth } from './auth.js'
import {
  closeDatabase,
  DB_NAME,
  getAllQuotes,
  getMongoClient,
  getRandomQuote,
  IS_DEVELOPMENT,
  isDatabaseConnected,
  saveQuote,
} from './db.js'

const PORT = 3000
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000

const { ADMIN_PASSWORD_HASH, SESSION_SECRET } = process.env

if (!ADMIN_PASSWORD_HASH?.startsWith('scrypt$') || !SESSION_SECRET || SESSION_SECRET.length < 32) {
  console.error(
    'Faltan ADMIN_PASSWORD_HASH (genéralo con `npm run hash-password`) o SESSION_SECRET (32 caracteres como mínimo).',
  )
  process.exit(1)
}

const app = express()

// Traefik sits in front of the app and sets X-Forwarded-Proto, needed for secure cookies.
app.set('trust proxy', 1)

const sessionCookieName = 'mongo-verba.sid'
const sessionCookieOptions = {
  httpOnly: true,
  secure: !IS_DEVELOPMENT,
  sameSite: 'strict',
  // Path must stay "/": the proxy strips /api/mongo-verba before the request
  // reaches the app, and express-session skips paths outside the cookie path.
  path: '/',
}
app.set('sessionCookieName', sessionCookieName)
app.set('sessionCookieOptions', sessionCookieOptions)

app.use(express.json())
app.use(
  session({
    name: sessionCookieName,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { ...sessionCookieOptions, maxAge: SESSION_MAX_AGE_MS },
    store: MongoStore.create({
      client: getMongoClient(),
      dbName: DB_NAME,
      ttl: SESSION_MAX_AGE_MS / 1000,
    }),
  }),
)

app.get('/health/liveness', async (req, res) => {
  res.status(200).json({ status: 'OK' })
})

app.get('/health/readiness', async (req, res) => {
  if (!isDatabaseConnected()) {
    res.status(503).json({ status: 'DATABASE_UNAVAILABLE' })
    return
  }

  res.status(200).json({ status: 'OK' })
})

app.use('/auth', createAuthRouter(ADMIN_PASSWORD_HASH))

app.get('/quotes', async (req, res) => {
  const includeDisabled = req.query.includeDisabled === 'true'

  if (includeDisabled && !isAuthenticated(req)) {
    res.status(401).json({ message: 'Necesitas iniciar sesión.' })
    return
  }

  try {
    const quotes = await getAllQuotes({ includeDisabled })
    res.status(200).json(quotes)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

app.get('/quotes/random', async (req, res) => {
  const { exclude } = req.query

  if (exclude !== undefined && !isValidObjectId(exclude)) {
    res.status(400).json({ message: 'The exclude parameter must be a valid quote id.' })
    return
  }

  try {
    const quote = await getRandomQuote(exclude)

    if (!quote) {
      res.status(404).json({ message: 'No quotes available.' })
      return
    }

    res.status(200).json(quote)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

app.post('/quotes', requireAuth, async (req, res) => {
  const { author, quote, note } = req.body ?? {}

  const quoteData = { quote }

  if (typeof author === 'string' && author.trim() !== '') {
    quoteData.author = author
  }

  if (typeof note === 'string' && note.trim() !== '') {
    quoteData.note = note
  }

  try {
    const savedQuote = await saveQuote(quoteData)
    console.log('Saved quote', savedQuote)
    res.status(201).json(savedQuote)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({ message: 'Error interno del servidor.' })
})

const server = app.listen(PORT, () => {
  console.log(`Servidor API escuchando en el puerto ${PORT}`)
})

// As PID 1 in the container, node ignores SIGTERM unless it is handled.
const shutdown = (signal) => {
  console.log(`${signal} recibido, cerrando el servidor...`)
  server.close(async () => {
    await closeDatabase()
    process.exit(0)
  })
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
