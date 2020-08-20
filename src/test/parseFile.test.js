const { getDataAndParseToMap } = require('../utils/parseFile')

describe('File parser', () => {
   test('it should parse the var/lib/dpkg/status file into a Map with needed props', async () => {
      const data = await getDataAndParseToMap()
      const keys = Array.from(data.keys()).sort((a, b) => a.localeCompare(b))
      //keys (pkg names)
      expect(keys[0]).toEqual('accountsservice')
      expect(keys.length).toEqual(700)
      //description
      const item = data.get('git')
      expect(item.desc).toBeTruthy()
      //deps
      const deps = [...new Set(item.deps)]
      expect(deps).toBeTruthy()
      expect(deps.length).toEqual(7)
      //reverse deps
      const values = Array.from(data.values())
      const revDeps = [
         ...new Set(
            values
               .filter(pkg => {
                  const deps = pkg.deps
                  return deps.find(x => x === 'libc6')
               })
               .map(v => v.name)
         ),
      ]
      expect(revDeps).toBeTruthy()
      expect(revDeps.includes('tcpd')).toBeTruthy()
   })
})
