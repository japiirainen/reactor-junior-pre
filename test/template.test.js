const path = require('path')
const { getFile } = require('../src/templatesUtil')
const { hasUncaughtExceptionCaptureCallback } = require('process')
describe('template module', () => {
   test('et should read template', async () => {
      const fileContents = await getFile(path.join(__dirname, '..', 'src', 'templates', 'template.html'))
      expect(fileContents).toBeDefined()
      expect(fileContents.includes('html')).toBeTruthy()
   })
})
