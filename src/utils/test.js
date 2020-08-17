const { config } = require('../config')
const packages = []

const parseItem = (itemStr, id) => {
   const item = {
      id,
      name: '',
      description: ``,
      reverseDepsIds: [],
      dependsOnIds: [],
      depends: [],
   }

   // Find name
   item.name = itemStr.match(/(?<=Package: ).+/)[0]
   packages[item.name] = id

   // Find description
   const descriptionSearch = itemStr.match(/(?<=Description: )[\s\S]+?(?=\n[A-Z])/)
   // Replace \n with <br/>
   item.description = descriptionSearch && descriptionSearch[0].replace('\n', '<br/>')

   // Format dependencies, remove version
   const dependsSearch = itemStr.match(/(?<=Depends: ).+/)
   if (dependsSearch) {
      const dependsList = dependsSearch[0].split(', ')
      item.depends = dependsList.map(depend => {
         return depend.replace(/ \(.+\)/, '').split(' | ')
      })

      // depends is a list of list of packages
      // i.e [['python', 'perl'], ['python', 'xml']]
   }

   return item
}

const calculateReverseDependencies = items => {
   items.forEach((item, id) => {
      item.depends.forEach(depend => {
         // depend is a list of packages, i.e ['python', 'perl']
         depend.forEach(itemName => {
            if (packages[itemName]) {
               items[packages[itemName]].reverseDepsIds.push(id)
            }
         })
      })
   })

   // Remove duplication
   items.forEach(item => {
      item.reverseDepsIds = [...new Set(item.reverseDepsIds)]
   })
}

const formatDependencies = items => {
   // Replace dependency by its ID and remove duplication
   items.forEach((item, id) => {
      item.dependsOnIds = item.depends
         .map(depend => {
            // Replace by ID
            const itemIds = depend.filter(itemName => packages[itemName]).map(itemName => packages[itemName])
            return itemIds
         })
         .filter(itemIds => itemIds.length > 0)
         .map(itemIds => itemIds[0])

      item.dependsOnIds = [...new Set(item.dependsOnIds)]
      delete item.depends
   })
}

const parseStatus = statusStr => {
   const rawItems = statusStr.split('\n\n').filter(item => item.startsWith('Package'))

   const items = rawItems.map(parseItem)
   calculateReverseDependencies(items)
   formatDependencies(items)

   return items
}

module.exports = {
   parseStatus,
}
