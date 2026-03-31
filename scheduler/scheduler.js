// CRONTAB
// 0 9 * * * /bin/bash $HOME/cronjob.sh "$HOME/scheduler.js" >> "$HOME/scheduler.log" 2>&1

async function fetchQuote() {
  const response = await fetch('https://rexwithluv.dev/api/mongo-verba/quotes/random')
  const data = await response.json()

  console.log('Get Quote: ', data)

  return data
}

async function sendNtfy(quoteObject) {
  const quote = quoteObject['quote']
  const author = quoteObject['author'] || ''

  await fetch('https://ntfy.sh/rwl', {
    method: 'POST',
    body: Buffer.from(quote, 'utf-8'),
    headers: {
      Title: author,
      Priority: 'high',
      Tags: 'thought_balloon',
    },
  })

  console.log('Sending ntfy... ')
}

async function main() {
  const quoteObj = await fetchQuote()
  await sendNtfy(quoteObj)
}

main()
