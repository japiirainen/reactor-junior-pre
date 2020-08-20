const { formatPackageNames, formatSingleItem } = require('../utils/format/formatHTML')
const { readFile } = require('../utils/parseFile')
const { config } = require('../config')
const { getDataAndParseToMap } = require('../utils/parseFile')

describe('template module', () => {
   test('it should read index template', async () => {
      const fileContents = await readFile(config.templates.itemList)
      expect(fileContents).toBeDefined()
      expect(fileContents.includes('html')).toBeTruthy()
   })
   test('it should read item template', async () => {
      const fileContents = await readFile(config.templates.singleItem)
      expect(fileContents).toBeDefined()
      expect(fileContents.includes('html')).toBeTruthy()
   })
   test('it should return formatted packageList as html', async () => {
      const data = await getDataAndParseToMap()
      const list = await formatPackageNames(data)
      expect(list).toBeTruthy()
   })
   test('it should return info about one package as html', async () => {
      const data = await getDataAndParseToMap()
      const item = await formatSingleItem(data, 'git')
      expect(item).toBeTruthy()
   })
})
