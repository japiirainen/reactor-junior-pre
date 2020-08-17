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
   const pkg = data.get(name)
   console.log(pkg)
   if (pkg) {
      const html = `
         <body>
         <header>
            <div class="header">
               <h1>${name}</h1>
            </div>
         </header>
         <main>
         <div class="container">
            <h4>Description: </h4>
            <p>${pkg.desc}</p>
         <h4>DependsOn: </h4>
            <ol>
            ${
               pkg.deps.length > 0
                  ? pkg.deps.map(v => {
                       return `<a href=${v} alt=${v}>
               <li> ${v} </li>
               </a>`
                    })
                  : `<h4>No dependencies</h4>`
            }
            </ol>
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
   console.error('no package found')
}

module.exports = {
   formatPackageNames,
   formatSingleItem,
}
