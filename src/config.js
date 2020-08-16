const path = require('path')

const config = {
   templates: {
      itemList: path.join(__dirname, 'templates', 'itemList.html'),
   },
   files: {
      varLib: path.join(__dirname, '..', 'var_lib_dpkg_status'),
   },
}

module.exports = {
   config,
}
