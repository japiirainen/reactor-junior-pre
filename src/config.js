const path = require('path')

const config = {
   templates: {
      itemList: path.join(__dirname, 'templates', 'itemList.html'),
      singleItem: path.join(__dirname, 'templates', 'singleItem.html'),
   },
   files: {
      varLib: path.join(__dirname, '..', 'var_lib_dpkg_status'),
   },
   regex: {
      packageNameRegex: /(?<=Package: )([\w'-.]+)(?<some>(?:a)?\w+)/g,
      packageDescRegex: /(?<=Description: )([\w'-.\ ]+)(?<some>(?:a)?\w+)/g,
   },
}

module.exports = {
   config,
}
