const Jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || 'kljsaklj9879879lhjlkjlkj'

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization

  if (!token) {
    return res.status(401).json({ message: 'Missing auth token' })
  }
  try {
    const removeBearer = token.split('Bearer ')[1]
    const { id } = Jwt.verify(removeBearer, jwtSecret)
    req.body.userId = id
    next()
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

module.exports = authMiddleware
