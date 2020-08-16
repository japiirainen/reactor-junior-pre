const path = require('path')

const config = {
   templates: {
      itemList: path.join(__dirname, 'templates', 'itemList.html'),
   },
   files: {
      varLib: path.join(__dirname, '..', 'var_lib_dpkg_status'),
   },
   regex: {
      packageNameRegex: /(?<=Package: )(?<some>(?:a)?\w+)/g,
   },
}

module.exports = {
   config,
}
