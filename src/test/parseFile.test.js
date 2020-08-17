const { getData } = require('../utils/parseFile')
describe('File parser', () => {
   test('it should read var/lib', async () => {
      const res = await getData()
      //test ids
      expect(res[0].id).toEqual(0)
      expect(res[1].id).toEqual(1)
      expect(res.slice(-1)[0].id).toEqual(504)
   })
})
