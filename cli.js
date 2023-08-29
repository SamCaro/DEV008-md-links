const mdLinks = require('../md-link');

const options = process.argv.slice(2);
console.log(process.argv)
console.log('La ruta es:', options[0]);
console.log('La opcion es:', options[1]);


// $ node cli.js ./ruta/de/prueba --stats
// La ruta es: ./ruta/de/prueba
// La opcion es: --stats

