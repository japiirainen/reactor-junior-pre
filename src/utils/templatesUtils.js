const { config } = require('../config')
const {
   readFile,
   findPackageNames,
   formatPackageNames,
   formatSingleItem,
   findPackageByName,
} = require('./fileContents')

// const req = /\{{\s*([a-z]+?)\s*\}}/g
// const re = /\{{\s*([a-z]+?)\s*\}}/

const makeList = async () => {
   const fileContents = await readFile(config.files.varLib)
   const packageNames = findPackageNames(fileContents)
   return formatPackageNames(packageNames)
}
const renderIndexPage = async (_, res) => {
   const template = await readFile(config.templates.itemList)
   const packageNameList = await makeList()
   const html = template.toString().replace('{{ list }}', packageNameList)
   res.send(html)
}

const makeItem = async v => {
   const fileContents = await readFile(config.files.varLib)
   const arr = findPackageNames(fileContents)
   const pkg = findPackageByName(arr, v)
   return formatSingleItem(pkg)
}

const renderItemPage = async (req, res) => {
   const template = await readFile(config.templates.singleItem)
   const singleItem = await makeItem(req.params.id)
   const html = template.toString().replace('{{ body }}', singleItem)
   res.send(html)
}

module.exports = {
   renderIndexPage,
   renderItemPage,
}
