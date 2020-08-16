const { config } = require('../config')
const { readFile, findPackageNames, formatPackageNames } = require('./fileContents')

const req = /\{{\s*([a-z]+?)\s*\}}/g
const re = /\{{\s*([a-z]+?)\s*\}}/

const renderList = async () => {
   const fileContents = await readFile(config.files.varLib)
   const packageNames = findPackageNames(fileContents)
   return formatPackageNames(packageNames)
}
const renderIndexPage = async (_, res) => {
   const html = await readFile(config.templates.itemList)
   const packageNameList = await renderList()
   const response = html.toString().replace('{{ list }}', packageNameList)
   res.send(response)
}

module.exports = {
   renderIndexPage,
}
