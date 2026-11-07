// Usage: npm run hash-password
// Reads the password from stdin (without echoing it when run in a terminal)
// and prints the value for ADMIN_PASSWORD_HASH.
import { createInterface } from 'node:readline'

import { hashPassword } from '../auth.js'

const MIN_LENGTH = 12

async function readPassword() {
  if (!process.stdin.isTTY) {
    const chunks = []
    for await (const chunk of process.stdin) chunks.push(chunk)
    return Buffer.concat(chunks).toString('utf8').replace(/\r?\n$/, '')
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true })
  rl._writeToOutput = (text) => {
    if (text.startsWith('Contraseña')) process.stdout.write(text)
  }

  const password = await new Promise((resolve) => rl.question('Contraseña: ', resolve))
  rl.close()
  process.stdout.write('\n')

  return password
}

const password = await readPassword()

if (password.length < MIN_LENGTH) {
  console.error(`La contraseña debe tener al menos ${MIN_LENGTH} caracteres.`)
  process.exit(1)
}

console.log(await hashPassword(password))
