import mongoose from 'mongoose'
import Quote from './models/Quote.js'

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.MONGO_USERNAME
const DB_PASSWORD = process.env.MONGO_PASSWORD

const mongoUri = IS_DEVELOPMENT
  ? `mongodb://${DB_USERNAME}:${DB_PASSWORD}@mongodb:27017`
  : `mongodb://${DB_USERNAME}:${DB_PASSWORD}@mongodb-service.mongo-verba.svc.cluster.local:27017`

try {
  await mongoose.connect(mongoUri, { dbName: DB_NAME })
  console.log('Backend conectado a MongoDB con éxito!')
} catch (e) {
  console.log(`Backend no logró conectarse con MongoDB: ${e.message}`)
}

export async function getAllQuotes() {
  console.debug('Run getAllQuotes() function')
  const quotes = await Quote.find()

  console.debug('Quotes: ', quotes)

  return quotes
}

export async function getRandomQuote() {
  console.debug('Run getRandomQuote(). Only return enabled = true quotes without enabled field')
  const quotes = await Quote.find({ enabled: true }).select('-enabled')
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

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
