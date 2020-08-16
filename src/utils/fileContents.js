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

const packageNameRegex = /(?<=Package: )(?<some>(?:a)?\w+)/g

const findPackageNames = data => {
   const packageNames = []
   const packages = data.match(packageNameRegex)
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

   return html
}

module.exports = {
   readFile,
   findPackageNames,
   formatPackageNames,
}
