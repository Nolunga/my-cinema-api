const router = require('express').Router()
const bodyParser = require('body-parser')
const authControllers = require('../controllers')

/**
 * This route handles user registration
 */
router.post('/register', bodyParser.json(), (request, response) => {
  return authControllers.signUp(request, response)
})

/**
 * This route handles user login with email and password
 */
router.post('/login', bodyParser.json(), (request, response) => {
  return authControllers.login(request, response)
})

module.exports = router
