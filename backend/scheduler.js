import cron from 'node-cron'

async function sendNtfy(quoteObject) {
  const quote = quoteObject['quote']
  const author = quoteObject['author'] || 'Anónimo'

  fetch('https://ntfy.sh/rwl', {
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

function scheduleNtfy() {
  try {
    const randomHour = Math.floor(Math.random() * 14) + 5 //Between 7am to 9pm
    const randomMinutes = Math.floor(Math.random() * 60)
    const totalMs = (randomHour * 60 + randomMinutes) * 60000

    const estimatedHour = (2 + randomHour) % 24
    console.log(
      `Próximo envío programado para las ${estimatedHour}:${randomMinutes.toString().padStart(2, '0')}`,
    )

    setTimeout(async () => {
      const response = await fetch('http://localhost:3000/quotes/random')
      const data = await response.json()

      await sendNtfy(data)
    }, totalMs)
  } catch (err) {
    console.error('Unknown error:', err)
  }
}

export default function setupNtfy() {
  console.log('SetupNtfy running...')

  scheduleNtfy()

  cron.schedule('0 2 * * *', () => scheduleNtfy())
}
