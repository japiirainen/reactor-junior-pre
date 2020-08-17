const fs = require('fs/promises')
const { config } = require('../config')

const readFile = async path => {
   try {
      const fileContents = await fs.readFile(path)
      return fileContents.toString()
   } catch (e) {
      console.error(e)
   }
}

const findPackageNames = file => {
   const packageNames = []
   const packages = file.match(config.regex.packageNameRegex)
   packageNames.push(packages)
   return packageNames.flat(1).sort((a, b) => a.localeCompare(b))
}

const findPkgDesc = file => {
   const descriptions = file.match(config.regex.packageDescRegex)
}

const formatPackageNames = data => {
   const html = data.map(v => {
      return `
      <a href=package/${v} alt=${v}>
        <li>
            ${v}
        </li>
      </a>
      `
   })
   if (html) {
      return html.join('')
   } else {
      console.error('failed to format data')
   }
}

const findPackageByName = (arr, v) => arr.find(x => x === v)

const formatSingleItem = pkg => {
   const html = `
         <body>
         <header>
            <div class="header">
               <h1>${pkg}</h1>
            </div>
         </header>
         <main>
            <div class="container">
            <table style="width:100%">
            <tr>
               <th>Description</th>
               <th>Depends on</th>
            </tr>
            <tr>
               <td>lol</td>
               <td>lol</td>
            </tr>
         </table>
            </div>
         </main>
      </body>
   `
   if (html) {
      return html
   } else {
      console.error('failed to format item')
   }
}

module.exports = {
   readFile,
   findPackageNames,
   formatPackageNames,
   formatSingleItem,
   findPackageByName,
}
