import mongoose from 'mongoose'

const quoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  author: { type: String, required: false },
  note: { type: String, required: false },
})

const Quote = mongoose.model('Quote', quoteSchema)

export default Quote
