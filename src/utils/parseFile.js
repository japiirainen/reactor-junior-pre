const { readFile } = require('./fileContents')
const { config } = require('../config')

const packages = []

const parseSingleItem = (str, id) => {
   const item = {
      id,
      name: '',
      desc: '',
      depsOn: [],
      revDep: [],
      deps: [],
   }
   item.name = str.match(/(?<=Package: ).+/)[0]
   packages[item.name] = id

   // Find description
   const descriptionSearch = str.match(/(?<=Description: )[\s\S]+?(?=\n[A-Z])/)
   // Replace \n with <br/>
   item.desc = descriptionSearch && descriptionSearch[0].replace('\n', '<br/>')
   //find deps and remove version numbers
   const depsSearch = str.match(/(?<=Depends: )[\s\S]+?(?=\n[A-Z])/)
   item.deps = depsSearch && depsSearch[0].replace(/\(.*?\)/g, '').trim()

   return item
}

//need to be able to find reverse deps so maybe should put deps as list of ids to be able to search with id

const parseFile = fileContents => {
   //packages separated by line so =>
   const singlePackages = fileContents.split('\n\n').filter(v => v.startsWith('Package'))
   //parse items
   const parsed = singlePackages.map(parseSingleItem)
   return parsed
}
async function getData() {
   const file = await readFile(config.files.varLib)
   const res = parseFile(file)
   return res
}
getData()

module.exports = {
   getData,
}
