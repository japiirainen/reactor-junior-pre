const path = require('path')

const config = {
   url: {
      itemList: path.join(__dirname, 'templates', 'itemList.html'),
   },
}

module.exports = {
   config,
}
