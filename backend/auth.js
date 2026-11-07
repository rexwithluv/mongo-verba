import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

import { Router } from 'express'
import { ipKeyGenerator, rateLimit } from 'express-rate-limit'

const scryptAsync = promisify(scrypt)

// scrypt parameters (N = 2^15). maxmem must allow 128 * N * r bytes.
const SCRYPT_PARAMS = { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }
const KEY_LENGTH = 64

/**
 * Hash a password as "scrypt$N$r$p$saltBase64$hashBase64".
 */
export async function hashPassword(password) {
  const salt = randomBytes(16)
  const hash = await scryptAsync(password, salt, KEY_LENGTH, SCRYPT_PARAMS)
  const { N, r, p } = SCRYPT_PARAMS

  return ['scrypt', N, r, p, salt.toString('base64'), hash.toString('base64')].join('$')
}

export async function verifyPassword(password, storedHash) {
  const [algorithm, N, r, p, saltBase64, hashBase64] = storedHash.split('$')

  if (algorithm !== 'scrypt' || !saltBase64 || !hashBase64) {
    throw new Error('ADMIN_PASSWORD_HASH has an invalid format.')
  }

  const expected = Buffer.from(hashBase64, 'base64')
  const actual = await scryptAsync(password, Buffer.from(saltBase64, 'base64'), expected.length, {
    N: Number(N),
    r: Number(r),
    p: Number(p),
    maxmem: SCRYPT_PARAMS.maxmem,
  })

  return timingSafeEqual(actual, expected)
}

export function isAuthenticated(req) {
  return req.session?.isAdmin === true
}

export function requireAuth(req, res, next) {
  if (isAuthenticated(req)) {
    next()
    return
  }

  res.status(401).json({ message: 'Necesitas iniciar sesión.' })
}

// Behind Cloudflare the real client IP is only in CF-Connecting-IP; fall back to
// req.ip outside Cloudflare (local development).
const clientKey = (req) => ipKeyGenerator(req.get('cf-connecting-ip') || req.ip)

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skipSuccessfulRequests: true,
  keyGenerator: clientKey,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Demasiados intentos. Prueba de nuevo en unos minutos.' },
})

export function createAuthRouter(adminPasswordHash) {
  const router = Router()

  router.get('/me', (req, res) => {
    res.status(200).json({ authenticated: isAuthenticated(req) })
  })

  router.post('/login', loginLimiter, async (req, res, next) => {
    const { password } = req.body ?? {}

    if (typeof password !== 'string' || password === '') {
      res.status(400).json({ message: 'Escribe la contraseña.' })
      return
    }

    try {
      if (!(await verifyPassword(password, adminPasswordHash))) {
        res.status(401).json({ message: 'Contraseña incorrecta.' })
        return
      }

      // New session id on login to prevent session fixation.
      req.session.regenerate((error) => {
        if (error) {
          next(error)
          return
        }

        req.session.isAdmin = true
        req.session.save((saveError) => {
          if (saveError) {
            next(saveError)
            return
          }

          res.status(200).json({ authenticated: true })
        })
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/logout', (req, res, next) => {
    req.session.destroy((error) => {
      if (error) {
        next(error)
        return
      }

      res.clearCookie(req.app.get('sessionCookieName'), req.app.get('sessionCookieOptions'))
      res.status(200).json({ authenticated: false })
    })
  })

  return router
}
