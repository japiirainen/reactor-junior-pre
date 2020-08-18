const path = require('path')

const config = {
   templates: {
      itemList: path.join(__dirname, 'templates', 'itemList.html'),
      singleItem: path.join(__dirname, 'templates', 'singleItem.html'),
   },
   files: {
      varLib: path.join(__dirname, '..', 'data', 'mock'),
   },
}

module.exports = {
   config,
}
