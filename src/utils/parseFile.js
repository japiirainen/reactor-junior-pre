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
   // Find description
   const descriptionSearch = str.match(/(?<=Description: )[\s\S]+?(?=\n[A-Z])/)
   // Replace \n with <br/>
   const desc = descriptionSearch && descriptionSearch[0].replace('\n', '<br/>').replace(/\.\s*\./, '.')
   //find deps and remove version numbers
   const depsSearch = str.match(/(?<=Depends: )[\s\S]+?(?=\n[A-Z])/)

   const deps = depsSearch
      ? depsSearch[0]
           .replace(/\(.*?\)/g, '')
           .split(',')
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

//need to be able to find reverse deps so maybe should put deps as list of ids to be able to search with id

const parseFile = fileContents => {
   //packages separated by empty line so split with\n\n
   const singlePackages = fileContents.split('\n\n').filter(v => v.startsWith('Package'))
   //parse items to a Map
   return new Map(singlePackages.map(parseSingleItem))
}

// cached data array
let _data

async function getData() {
   if (_data) return _data
   const file = await readFile(config.files.varLib)
   _data = parseFile(file)
   return _data
}
getData()

module.exports = {
   getData,
   readFile,
}
