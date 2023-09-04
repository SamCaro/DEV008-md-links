const mdLinks = require('./md-links');
//const mdLinks = require('./node-methods');

const options = process.argv.slice(2);
console.log(process.argv)
console.log('La ruta es:', options[0]);
console.log('La opcion es:', options[1]);
const path = options[0];

mdLinks(path)
.then((arr) => {
    console.log('mdLinks devuelve', arr)
    arr.forEach((element) => {
        console.log(element)
    })
})
.catch((err) => {
    console.log(err)
})

// $ node cli.js ./ruta/de/prueba --stats
// La ruta es: ./ruta/de/prueba
// La opcion es: --stats

// mdLinks('src/documents-mds/otrosArchivos.md', { validate: true})
// .then((links) => {
//     console.log(links)
// })
// .catch((err) => {
//     console.log(err)
// })

mdLinks('otrosArchivos.md')
.then((promise) => {
  console.log(promise.flat())
  promise.flat();
})
.catch((err) => {
  console.log(err)
})


//  barras diagonales(/) convención en sistemas Unix (como Git Bash en Windows)