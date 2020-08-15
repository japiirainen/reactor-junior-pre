const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { renderTemplate } = require('./templatesUtil')
const app = express()

dotenv.config()

const PORT = process.env.PORT

app.use(express.static(path.join(__dirname, 'templates', 'styles')))
app.use('/hello.html', renderTemplate)

app.get('/', (req, res) => {
   res.send({ message: 'hello world' })
})

app.get('/hello.html', async (req, res) => {
   const html = await getFile(path.join(dirname, 'src', 'templates', 'template.html'))
   const response = html.toString().replace('{{ package }}', 'kaikki on pilalla')
   res.send(response)
})

app.listen(PORT, (req, res) => {
   console.log(`Listening on port: http://localhost:${PORT}`)
})
