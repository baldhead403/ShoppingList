const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const items = require('./routes/api/items')
const app = express()

app.use(bodyParser.json())

//DB Config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose.connect(db ,  { useNewUrlParser: true })
.then(() => console.log('MongoDb Connected...'))
.catch(err => console.log(err))

app.use('/api/items', items)

const port = process.env.Port || 3001

app.listen(port, () => console.log('Server started on port ' + port))