const fs = require('fs/promises')
const path = require('path')

const req = /\{{\s*([a-z]+?)\s*\}}/g
const re = /\{{\s*([a-z]+?)\s*\}}/

//const dirname = path.resolve(path.dirname(``))

const getFile = async path => {
   const fileContents = await fs.readFile(path)
   return fileContents.toString()
}

const renderTemplate = async (req, res) => {
   const html = await getFile(path.join(__dirname, 'templates', 'template.html'))
   const response = html.toString().replace('{{ package }}', 'kaikki on pilalla')
   res.send(response)
}

module.exports = {
   renderTemplate,
}
