import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Quote from './models/Quote.js'

const app = express()
const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.MONGO_USERNAME
const DB_PASSWORD = process.env.MONGO_PASSWORD
const PORT = 3000

app.use(express.json())
app.use(cors())

const mongoUri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@mongodb:27017`

try {
  await mongoose.connect(mongoUri, { dbName: DB_NAME })
  console.log('Express conectado a MongoDB con éxito!')
} catch (e) {
  console.log(`Express no logró conectarse con MongoDB: ${e.message}`)
}

app.get('/quotes/random', async (req, res) => {
  try {
    const quotes = await Quote.find()
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    res.status(200).json(randomQuote)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

app.post('/quotes', async (req, res) => {
  const { author, quote, note } = req.body

  if (!author || !quote) {
    return res.status(400).json({ message: 'El texto de la frase es obligatorio.' })
  }

  const newQuote = new Quote({ author, quote, note })
  try {
    const savedQuote = await newQuote.save()
    res.status(201).json(savedQuote)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor API escuchando en el puerto ${PORT}`)
})
