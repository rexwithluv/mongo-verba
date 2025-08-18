db.createCollection('quotes')

db.quotes.insertMany([
  {
    quote: 'Be kind',
  },
  {
    quote: 'Love is nothing stronger\nThan a boy with luv',
    author: 'BTS',
  },
  {
    quote: "It's me, hi, I'm the problem, it's me",
    author: 'Taylor Swift',
    note: 'Anti-Hero, Midnights',
  },
])
