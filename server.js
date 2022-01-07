require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const mime = require('mime')

const app = express()

app.use(express.json({ limit: '25mb' }))
app.use(cors())
app.use(cookieParser())

app.use('/image', require('./routers/imagesRouter'))
app.use(function (req, res) {
	res.status(404).send('404 Not Found')
})

const URI = process.env.MONGODB_URL
mongoose.connect(URI, (err) => {
	if (err) throw err
	console.log('Connected to mongodb')
})

const PORT = process.env.PORT || 5004

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
