require('dotenv').config()
const express = require('express')
const connectDB = require('./db/mongoose')
require('./automation/automation')
const userRouter = require('./routers/user')
const itemRouter = require('./routers/item')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
app.use('/users',userRouter)
app.use('/items',itemRouter)

connectDB();

app.listen(port, () => {
  console.log('Server is up on port '+port)
})