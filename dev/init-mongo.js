db.createCollection('quotes')

db.quotes.insertMany([
  {
    quote: 'Be kind',
    enabled: false,
  },
  {
    quote: 'Love is nothing stronger\nThan a boy with luv',
    author: 'BTS',
    enabled: true,
  },
  {
    quote: "It's me, hi, I'm the problem, it's me",
    author: 'Taylor Swift',
    note: 'Anti-Hero, Midnights',
    enabled: true,
  },
  {
    quote: 'U see me?',
    note: 'This quote is disabled',
  },
])
