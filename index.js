const authRouter = require('./src/auth/routes')
const seriesRouter = require('./src/series/routes')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use('/', authRouter)
app.use('/', seriesRouter)

app.listen(4000, () => {
  console.log('Running an API server at http://localhost:4000')
})
