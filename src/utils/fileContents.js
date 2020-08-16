const fs = require('fs/promises')
const { compose } = require('ramda')
const { config } = require('../config')

const readFile = async path => {
   try {
      const fileContents = await fs.readFile(path)
      return fileContents.toString()
   } catch (e) {
      console.error(e)
   }
}

const findPackageNames = data => {
   const packageNames = []
   const packages = data.match(config.regex.packageNameRegex)
   packageNames.push(packages)
   return packageNames.flat(1)
}

const formatPackageNames = data => {
   const html = data.map(v => {
      return `
      <a href=${v} alt=${v}>
        <li>
            ${v}
        </li>
      </a>
      `
   })
   if (html) {
      return html
   } else {
      console.error('failed to format data')
   }
}

module.exports = {
   readFile,
   findPackageNames,
   formatPackageNames,
}
