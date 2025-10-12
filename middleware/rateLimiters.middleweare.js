import { rateLimiter } from '../utils/rateLimiterMemory.js'

export async function rateLimiterMiddleware(req, res, next) {
  try {
    await rateLimiter.consume(req.ip)
    next()
  } catch (err) {
    res.set('Retry-After', String(Math.round(err.msBeforeNext / 1000)) || 1)
    res.status(429).send('Too Many Requests')
  }
}