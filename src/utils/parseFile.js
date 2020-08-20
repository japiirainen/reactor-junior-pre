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

const parseSingleItem = str => {
   const name = str.match(/(?<=Package: ).+/)[0]
   const descriptionSearch = str.match(/(?<=Description: )[\s\S]+?(?=\n[A-Z])/)
   const desc = descriptionSearch && descriptionSearch[0].replace('\n', '<br/>').replace(/\.\s*\./, '.')
   const depsSearch = str.match(/(?<=Depends: )[\s\S]+?(?=\n[A-Z])/)
   const deps = depsSearch
      ? depsSearch[0]
           .replace(/\(.*?\)/g, '')
           .split(',')
           .map(v => v.split(' | '))
           .flat()
           .map(v => v.trim())
      : []

   return [
      name,
      {
         name,
         desc,
         deps,
      },
   ]
}

const parseFile = fileContents => {
   //packages separated by empty line so split with\n\n
   const packages = fileContents.split('\n\n').filter(v => v.startsWith('Package'))
   //parse items to a Map
   return new Map(packages.map(parseSingleItem))
}

// cached data array
let _data
async function getDataAndParseToMap() {
   if (_data) return _data
   const file = await readFile(config.files.varLib)
   _data = parseFile(file)
   return _data
}

module.exports = {
   getDataAndParseToMap,
   readFile,
}
