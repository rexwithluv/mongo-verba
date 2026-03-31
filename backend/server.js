import cors from 'cors'
import express from 'express'

import { getAllQuotes, getRandomQuote, saveQuote } from './db.js'

const app = express()

const PORT = 3000

app.use(express.json())
app.use(cors())

app.get('/health/liveness', async (req, res) => {
  res.status(200).json({ status: 'OK' })
})

app.get('/quotes', async (req, res) => {
  try {
    const quotes = await getAllQuotes()
    res.status(200).json(quotes)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

app.get('/quotes/random', async (req, res) => {
  try {
    const quote = await getRandomQuote()

    res.status(200).json(quote)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

app.post('/quotes', async (req, res) => {
  if (process.env.ENABLE_INSERT_QUOTE === 'false') {
    res.status(405).json({
      message: 'The quote-saving feature is disabled.',
    })
    return
  }

  const { author, quote, note } = req.body

  const quoteData = { quote }

  if (author && author.trim() !== '') {
    quoteData.author = author
  }

  if (note && note.trim() !== '') {
    quoteData.note = note
  }

  try {
    const savedQuote = await saveQuote(quoteData)
    console.log("Saved quote", savedQuote)
    res.status(201).json(savedQuote)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor API escuchando en el puerto ${PORT}`)
})
