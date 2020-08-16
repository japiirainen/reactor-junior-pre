const { readFile } = require('../utils/fileContents')
const { config } = require('../config')

describe('template module', () => {
   test('it should read template', async () => {
      const fileContents = await readFile(config.templates.itemList)
      expect(fileContents).toBeDefined()
      expect(fileContents.includes('html')).toBeTruthy()
   })
})
