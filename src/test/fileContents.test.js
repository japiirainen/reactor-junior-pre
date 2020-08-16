const { config } = require('../config')
const { readFile, findPackageNames, formatPackageNames } = require('../utils/fileContents')

describe('file contents', () => {
   test('it should read var/lib/dpkg/status', async () => {
      const fileContents = await readFile(config.files.varLib)
      expect(fileContents).toBeTruthy()
   })
   test('it should get a list of package names', async () => {
      const fileContents = await readFile(config.files.varLib)
      const packageNames = findPackageNames(fileContents)
      expect(packageNames).toContain('zerofree')
   })
   test('it should print <li> items of package names', async () => {
      const fileContents = await readFile(config.files.varLib)
      const packageNames = findPackageNames(fileContents)
      const res = formatPackageNames(packageNames)
      expect(res).toBeDefined()
   })
})
