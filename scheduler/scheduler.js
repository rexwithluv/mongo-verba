const mongoVerbaUrl = process.env.MONGO_VERBA_URL
const ntfyTopic = process.env.NTFY_TOPIC

async function fetchQuote() {
  const response = await fetch(mongoVerbaUrl)
  const data = await response.json()

  console.log('Get Quote: ', data)

  return data
}

async function sendNtfy(quoteObject) {
  const quote = quoteObject['quote']
  const author = quoteObject['author'] || ''

  await fetch(`https://ntfy.sh/${ntfyTopic}`, {
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

main().catch(console.error)
