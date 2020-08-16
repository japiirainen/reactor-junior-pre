const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { renderIndexPage } = require('./utils/templatesUtils')
const app = express()

dotenv.config()
const PORT = process.env.PORT

//middleware
app.use(express.static(path.join(__dirname, 'templates', 'styles')))
app.use('/hello.html', renderIndexPage)

app.get('/', (_, res) => {
   res.send({ message: 'hello world' })
})

app.listen(PORT, (_, __) => {
   console.log(`Listening on port: http://localhost:${PORT}`)
})
