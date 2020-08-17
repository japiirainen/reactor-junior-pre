const { config } = require('../config')
const { formatPackageNames, formatSingleItem } = require('./formatHTML')

const { getData, readFile } = require('./parseFile')

// const req = /\{{\s*([a-z]+?)\s*\}}/g
// const re = /\{{\s*([a-z]+?)\s*\}}/

const makePkgTemplate = async name => {
   const data = await getData()
   return formatSingleItem(data, name)
}

const makeIndexTemplate = async () => {
   const data = await getData()
   return formatPackageNames(data)
}

//.sort((a, b) => a.name.localeCompare(b.name))
const renderIndexPage = async (_, res) => {
   const template = await readFile(config.templates.itemList)
   const packageNameList = await makeIndexTemplate()
   const html = template.toString().replace('{{ list }}', packageNameList)
   res.send(html)
}

const renderItemPage = async (req, res) => {
   const template = await readFile(config.templates.singleItem)
   const item = await makePkgTemplate(req.params.name)
   const html = template.toString().replace('{{ body }}', item)
   res.send(html)
}

module.exports = {
   renderIndexPage,
   renderItemPage,
}
