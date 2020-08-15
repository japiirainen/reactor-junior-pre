const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { renderItemList, renderNotFoundPage } = require('./templatesUtil')
const app = express()

dotenv.config()

const PORT = process.env.PORT

app.use(express.static(path.join(__dirname, 'templates', 'styles')))
app.use('/hello.html', renderItemList)

app.get('/', (req, res) => {
   res.send({ message: 'hello world' })
})

app.listen(PORT, (_, __) => {
   console.log(`Listening on port: http://localhost:${PORT}`)
})
