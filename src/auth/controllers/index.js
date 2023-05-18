const database = require('../../database.js')
const {
  generateJWTToken,
  encryptUserPassword,
  validateUserPasswod
} = require('../services')

module.exports = {
  login: (request, response) => {
    const { email, password } = request.body
    return new Promise(async (resolve, reject) => {
      database.get(
        'SELECT * FROM user WHERE email = ? LIMIT 1;',
        [email],
        async (error, row) => {
          if (error) {
            return response.status(403).send('Email or password is incorrect')
          }
          if (!row) {
            return response.status(403).send('Email or password is incorrect')
          }
          const userData = row
          const isPasswordValid = await validateUserPasswod(
            password,
            userData.password
          )
          if (!isPasswordValid) {
            return response.status(403).send('Email or password is incorrect')
          }
          delete userData.password
          const jwt = generateJWTToken({
            id: userData.id,
            email: userData.email
          })
          const payload = {
            user: userData,
            jwt
          }
          return resolve(response.status(200).send(payload))
        }
      )
    })
  },
  signUp: (request, response) => {
    const { email, password } = request.body
    const createdAt = new Date().toISOString()
    const updatedAt = new Date().toISOString()
    return new Promise(async (resolve, reject) => {
      const passwordHash = await encryptUserPassword(password)
      database.run(
        'INSERT INTO user (createdAt,updatedAt,email, password) VALUES (?,?,?,?);',
        [createdAt, updatedAt, email, passwordHash],
        (error) => {
          if (error) {
            const errorMessage = error.message.includes('UNIQUE')
              ? 'You are already registered, please login'
              : 'Something went wrong'
            return reject(response.status(500).send(errorMessage))
          }
          database.all(
            'SELECT * FROM user WHERE email = ? LIMIT 1',
            [email],
            (error, rows) => {
              if (error) {
                return reject(response.status(500).send('Something went wrong'))
              }
              const userData = rows[0]
              delete userData.password
              const jwt = generateJWTToken({
                id: userData.id,
                email: userData.email
              })
              const payload = {
                user: userData,
                jwt
              }
              return resolve(response.status(200).send(payload))
            }
          )
        }
      )
    })
  }
}
