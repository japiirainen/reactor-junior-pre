const { config } = require('../config')
const { readFile, formatPackageNames, formatSingleItem } = require('./fileContents')
const { getData } = require('./parseFile')

// const req = /\{{\s*([a-z]+?)\s*\}}/g
// const re = /\{{\s*([a-z]+?)\s*\}}/

const makePkgTemplate = async id => {
   const data = await getData()
   return await formatSingleItem(data, id)
}

const makeIndexTemplate = async () => {
   const data = await getData()
   return await formatPackageNames(data.sort((a, b) => a.name.localeCompare(b.name)))
}

const renderIndexPage = async (_, res) => {
   const template = await readFile(config.templates.itemList)
   const packageNameList = await makeIndexTemplate()
   const html = template.toString().replace('{{ list }}', packageNameList)
   res.send(html)
}

const renderItemPage = async (req, res) => {
   const template = await readFile(config.templates.singleItem)
   const item = await makePkgTemplate(req.params.id)
   const html = template.toString().replace('{{ body }}', item)
   res.send(html)
}

module.exports = {
   renderIndexPage,
   renderItemPage,
}
