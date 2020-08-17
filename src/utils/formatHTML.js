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
   const package = data.get(name)
   //remove duplicates from deps
   const deps = [...new Set(package.deps)]
   //find reverse deps
   const values = Array.from(data.values())
   //remove duplicates from reverse deps
   const revDeps = [
      ...new Set(
         values
            .filter(pkg => {
               const deps = pkg.deps
               return deps.find(x => x === name)
            })
            .map(v => v.name)
      ),
   ]

   if (package) {
      const html = `
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
            <p>${package.desc}</p>
         <h4 class="deps">Dependencies: </h4>
            <ul>
            ${
               deps.length > 0
                  ? deps
                       .map(v => {
                          return `<a href=${v === 'python3:any' ? v.replace(':any', '') : v} alt=${v}>
               <li> ${v} </li>
               </a>`
                       })
                       .join('')
                  : `<h4>No dependencies</h4>`
            }
            </ul>
            <h4 class="deps">Reverse dependencies: </h4>
            <ul>
            ${
               revDeps.length > 0
                  ? revDeps
                       .map(v => {
                          return `<a href=${v === 'python3:any' ? v.replace(':any', '') : v} alt=${v}>
               <li> ${v} </li>
               </a>`
                       })
                       .join('')
                  : `<h4>No reverse dependencies</h4>`
            }
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
   console.error('no package found')
}

module.exports = {
   formatPackageNames,
   formatSingleItem,
}
