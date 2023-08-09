const sumar = require('./index')
console.log(':C')

const fs = require('fs')

const arg = process.argv
//const suma = sumar(5)
//console.log(suma)
console.log(arg)
sumar(5).then((s) => {
    console.log(s)
   fs.readdir
}).catch((error) => {
    console.log(error)
})

// if (arg.length > 2) {
//     console.log(suma + 2)
// } else {
//     console.log(suma)
// }