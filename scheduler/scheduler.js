async function fetchQuote(url) {
  const response = await fetch(url)
  const data = await response.json()

  console.log('Get Quote: ', data)

  return data
}

async function sendNtfy(quoteObject, ntfyTopic) {
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
  const mongoVerbaUrl = process.env.MONGO_VERBA_URL
  const ntfyTopic = process.env.NTFY_TOPIC

  if (!mongoVerbaUrl || !ntfyTopic) {
    console.error('Error: MONGO_VERBA_URL and NTFY_TOPIC environment variables must be set.')
    process.exit(1)
  }

  const quoteObj = await fetchQuote(mongoVerbaUrl)
  await sendNtfy(quoteObj, ntfyTopic)
}

main().catch(console.error)
