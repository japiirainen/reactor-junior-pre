const { config } = require('../config')
const {
   readFile,
   findPackageNames,
   formatPackageNames,
   formatSingleItem,
   findPackageByName,
} = require('../utils/fileContents')

describe('templates', () => {
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

   //single item tests

   test('should find package with name', async () => {
      const fileContents = await readFile(config.files.varLib)
      const arr = findPackageNames(fileContents)
      const item = findPackageByName(arr, 'bind9-host')
      expect(item).toEqual('bind9-host')
   })
   test('it should print valid html for a single package item', async () => {
      const res = await formatSingleItem({
         name: `python-apt-common`,
         description: `Python interface to libapt-pkg (locales)
         The apt_pkg Python interface will provide full access to the internal
         libapt-pkg structures allowing Python programs to easily perform a
         variety of functions.`,
         dependsOn: `e2fslibs (>= 1.37), libc6 (>= 2.4)`,
      })
      expect(res.includes('<body>')).toBeTruthy()
   })

   //pkg.description
   test('it should find descriptions for packages', async () => {})
})
