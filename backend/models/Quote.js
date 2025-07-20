import mongoose from 'mongoose'

const quoteSchema = new mongoose.Schema({
  author: { type: String, required: true },
  quote: { type: String, required: true },
  note: { type: String, required: false },
})

const Quote = mongoose.model('Quote', quoteSchema)

export default Quote
