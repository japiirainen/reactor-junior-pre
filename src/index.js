const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { renderIndexPage, renderItemPage } = require('./utils/templatesUtils')
const app = express()

dotenv.config()

const PORT = process.env.PORT

//apply stylesheet
app.use(express.static(path.join(__dirname, 'templates', 'styles')))

//routes
app.get('/', renderIndexPage)
app.get('/package/:name', renderItemPage)

app.listen(PORT, (_, __) => {
   console.log(`Listening on port: http://localhost:${PORT}`)
})
