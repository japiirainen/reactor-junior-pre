const { getFile } = require('../templatesUtil')
const { config } = require('../config')

describe('template module', () => {
   test('et should read template', async () => {
      const fileContents = await getFile(config.url.itemList)
      expect(fileContents).toBeDefined()
      expect(fileContents.includes('html')).toBeTruthy()
   })
})
