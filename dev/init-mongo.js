db.createCollection('quotes')

db.quotes.insertMany([
  {
    author: 'me',
    quote: 'inspirational quote',
  },
  {
    author: 'taylor swift',
    quote: "it's me, hi! i'm the problem, it's me.",
  },
  {
    author: 'taylor alison swift',
    quote:
      'the burgundy on my tshirt when u splash ur wine into me and how the blood rushed into my cheeks so scarlet, it was maroon',
  },
])
