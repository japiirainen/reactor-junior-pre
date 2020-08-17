const { readFile, formatPackageNames, formatSingleItem } = require('../utils/fileContents')
const { config } = require('../config')
const { getData } = require('../utils/parseFile')

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
      const data = await getData()
      const list = await formatPackageNames(data)
      expect(list).toBeTruthy()
   })
   test('it should return info about one package as html', async () => {
      const data = await getData()
      const item = await formatSingleItem(data, 1)
      expect(item).toBeTruthy()
   })
})
