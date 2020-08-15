const fs = require('fs/promises')
const path = require('path')
const { config } = require('./config')

const req = /\{{\s*([a-z]+?)\s*\}}/g
const re = /\{{\s*([a-z]+?)\s*\}}/

const getFile = async path => {
   const fileContents = await fs.readFile(path)
   return fileContents.toString()
}

const renderItemList = async (req, res) => {
   const html = await getFile(config.url.itemList)
   const response = html.toString().replace('{{ package }}', 'kaikki on pilalla')
   res.send(response)
}

module.exports = {
   renderItemList,
   getFile,
}
