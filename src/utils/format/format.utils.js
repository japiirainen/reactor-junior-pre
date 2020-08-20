//function for finding reverse dependencies + caching
//caching could use redis for persistance
let _revDeps = {}
const findRevDeps = (values, name) => {
   if (_revDeps[name]) {
      return _revDeps[name]
   } else {
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
      _revDeps[name] = revDeps
      return revDeps
   }
}

const formatDependencies = (deps, data, emptyMsg) => {
   if (deps.length > 0) {
      return deps
         .map(v => {
            const item = data.get(v)
            if (item) {
               return `<a href=${v === 'python3:any' ? v.replace(':any', '') : v} alt=${v}>
               <li> ${v} </li>
               </a>`
            } else {
               return `<li> ${v} </li>`
            }
         })
         .join('')
   } else {
      return `<h4>${emptyMsg}</h4>`
   }
}

module.exports = {
   findRevDeps,
   formatDependencies,
}
