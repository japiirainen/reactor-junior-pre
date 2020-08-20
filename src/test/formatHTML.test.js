const { formatDependencies } = require('../utils/format/formatHTML')
const { getDataAndParseToMap } = require('../utils/parseFile')

describe('HTML formatter', () => {
   test('should format a list of dependencies to html format', async () => {
      const data = await getDataAndParseToMap()
      const result = formatDependencies(
         ['libapt-inst1.4', 'libapt-pkg4.12', 'libc6', 'libdb5.1', 'libgcc1', 'libstdc++6'],
         data
      )
      expect(result.includes('<a href=libapt-inst1.4 alt=libapt-inst1.4>')).toBeTruthy()
   })
})
