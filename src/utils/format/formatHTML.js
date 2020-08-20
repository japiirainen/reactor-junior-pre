const { findRevDeps, formatDependencies } = require('./format.utils')

const formatPackageNames = data => {
   const keys = Array.from(data.keys()).sort((a, b) => a.localeCompare(b))
   const html = keys.map(key => {
      return `
      <a href=package/${key} alt=${key}>
        <li>
            ${key}
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

const formatSingleItem = (data, name) => {
   const item = data.get(name)
   if (item) {
      const deps = [...new Set(item.deps)]
      const values = Array.from(data.values())
      const revDeps = findRevDeps(values, item.name)
      let html = `
         <body>
         <header>
            <div class="header">
               <a class="home" href=${'/'}>
                  <h4><= Home</h4>
                </a>
            </div>
         </header>
         <main>
         <div class="container">
         <h4>Package name: </h4><span class="name">${name}</span>
            <h4 class="desc">Description: </h4>
            <p>${item.desc}</p>
         <h4 class="deps">The dependencies of this package: </h4>
            <ul>
             ${formatDependencies(deps, data, 'No dependencies')}
            </ul> 
         <h4 class="deps">The reverse dependencies of this package: </h4>
            <ul>
             ${formatDependencies(revDeps, data, 'No reverse dependencies')}
            </ul>
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
   console.error('No package found')
}

module.exports = {
   formatPackageNames,
   formatSingleItem,
   formatDependencies,
}
