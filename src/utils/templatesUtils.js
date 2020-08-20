const { config } = require('../config')
const { formatPackageNames, formatSingleItem } = require('./format/formatHTML')
const { getDataAndParseToMap, readFile } = require('./parseFile')

const constructListToHTML = async () => {
   const data = await getDataAndParseToMap()
   return formatPackageNames(data)
}

const constructPackageToHTML = async name => {
   const data = await getDataAndParseToMap()
   return formatSingleItem(data, name)
}

const {
   templates: { itemList, singleItem },
} = config

const renderIndexPage = async (_, res) => {
   const template = await readFile(itemList)
   const packageNameList = await constructListToHTML()
   const html = template.toString().replace('{{ list }}', packageNameList)
   res.send(html)
}

const renderItemPage = async (req, res) => {
   const template = await readFile(singleItem)
   const item = await constructPackageToHTML(req.params.name)
   const html = template.toString().replace('{{ package info }}', item)
   res.send(html)
}

module.exports = {
   renderIndexPage,
   renderItemPage,
}
