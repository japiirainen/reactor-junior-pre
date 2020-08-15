const fs = require('fs/promises')
const { config } = require('./config')

const req = /\{{\s*([a-z]+?)\s*\}}/g
const re = /\{{\s*([a-z]+?)\s*\}}/

const getFile = async path => {
   try {
      const fileContents = await fs.readFile(path)
      return fileContents.toString()
   } catch (e) {
      console.error(e)
   }
}

const renderItemList = async (_, res) => {
   const html = await getFile(config.url.itemList)
   const response = html.toString().replace('{{ h1 }}', 'var/lib/dpkg/status packages')
   res.send(response)
}

module.exports = {
   renderItemList,
   getFile,
}
