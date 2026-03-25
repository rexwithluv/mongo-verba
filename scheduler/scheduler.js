// CRONTAB
// 0 9 * * * sleep $((RANDOM \% (13 * 60 * 60))) && scheduler.js

async function fetchQuote() {
  const response = await fetch('https://rexwithluv.dev/api/mongo-verba/quotes/random')
  const data = await response.json()

  console.log(`Get Quote: ${data}`)

  return data
}

async function sendNtfy(quoteObject) {
  const quote = quoteObject['quote']
  const author = quoteObject['author'] || 'Anónimo'

  await fetch('https://ntfy.sh/rwl', {
    method: 'POST',
    body: quote,
    headers: {
      Title: author,
      Priority: 'high',
      Tags: 'thought_balloon',
    },
  })

  console.log(`Sending ntfy: ${quoteObject}`)
}

async function main() {
  const quoteObj = await fetchQuote()
  await sendNtfy(quoteObj)
}

main()
