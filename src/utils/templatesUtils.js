const { config } = require('../config')
const { formatPackageNames, formatSingleItem } = require('./formatHTML')

const { getData, readFile } = require('./parseFile')

const constructPackageHTML = async name => {
   const data = await getData()
   return formatSingleItem(data, name)
}

const constructListHTML = async () => {
   const data = await getData()
   return formatPackageNames(data)
}

const renderIndexPage = async (_, res) => {
   const template = await readFile(config.templates.itemList)
   const packageNameList = await constructListHTML()
   const html = template.toString().replace('{{ list }}', packageNameList)
   res.send(html)
}

const renderItemPage = async (req, res) => {
   const template = await readFile(config.templates.singleItem)
   const item = await constructPackageHTML(req.params.name)
   const html = template.toString().replace('{{ package info }}', item)
   res.send(html)
}

module.exports = {
   renderIndexPage,
   renderItemPage,
}
