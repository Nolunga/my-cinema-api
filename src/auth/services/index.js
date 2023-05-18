const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10
const jwtSecret = process.env.JWT_SECRET || 'kljsaklj9879879lhjlkjlkj'

module.exports = {
  generateJWTToken: (userData) => {
    const token = jwt.sign(userData, jwtSecret)
    return token
  },
  encryptUserPassword: async (password) => {
    return await bcrypt.hashSync(password, saltRounds)
  },
  validateUserPasswod: async (password, hashPassword) => {
    return await bcrypt.compareSync(password, hashPassword)
  }
}
