import mongoose from 'mongoose'
import Quote from './models/Quote.js'

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.MONGO_USERNAME
const DB_PASSWORD = process.env.MONGO_PASSWORD

const MONGO_HOST = IS_DEVELOPMENT ? 'mongodb' : 'mongodb-service.mongo-verba.svc.cluster.local'
const mongoUri = `mongodb://${encodeURIComponent(DB_USERNAME)}:${encodeURIComponent(DB_PASSWORD)}@${MONGO_HOST}:27017`

try {
  await mongoose.connect(mongoUri, { dbName: DB_NAME })
  console.log('Backend conectado a MongoDB con éxito!')
} catch (e) {
  console.error(`Backend no logró conectarse con MongoDB: ${e.message}`)
  process.exit(1)
}

export async function closeDatabase() {
  await mongoose.disconnect()
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === mongoose.ConnectionStates.connected
}

export async function getAllQuotes() {
  console.debug('Run getAllQuotes() function')
  const quotes = await Quote.find()

  console.debug('Quotes: ', quotes)

  return quotes
}

export async function getRandomQuote(excludeId) {
  console.debug('Run getRandomQuote(). Only return enabled = true quotes without enabled field')
  const match = { enabled: true }

  if (excludeId) {
    match._id = { $ne: new mongoose.Types.ObjectId(excludeId) }
  }

  const randomQuoteArray = await Quote.aggregate([
    { $match: match },
    { $sample: { size: 1 } },
    { $project: { enabled: 0 } },
  ])
  const randomQuote = randomQuoteArray[0]

  console.debug('RandomQuote: ', randomQuote)

  return randomQuote
}

export async function saveQuote(data) {
  const quote = {
    ...data,
    enabled: true,
  }
  const savedQuote = await new Quote(quote).save()

  return savedQuote
}
