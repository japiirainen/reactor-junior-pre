const formatPackageNames = data => {
   const html = data.map(v => {
      return `
      <a href=package/${v.id} alt=${v.name}>
        <li>
            ${v.name}
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

const formatSingleItem = (data, id) => {
   const pkg = data[id]
   if (pkg) {
      const html = `
         <body>
         <header>
            <div class="header">
               <h1>${pkg.name}</h1>
            </div>
         </header>
         <div>
         <h4>Description: </h4>
         <p>${pkg.desc}</p>
         </div>
         <main>
         <h4>DependsOn: </h4
            <ol>
               <li>some package</li>
               <li>some other package</td>
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
