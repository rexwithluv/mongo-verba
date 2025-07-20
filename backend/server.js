import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Quote from './models/Quote.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

const mongoUri = 'mongodb://root:root@localhost:27017/admin'

try {
  await mongoose.connect(mongoUri)
  console.log('Express conectado a MongoDB con éxito!')
} catch (e) {
  console.log(`Express no logró conectarse con MongoDB: ${e.message}`)
}

app.get('/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find()
    res.status(200).json(quotes)
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
