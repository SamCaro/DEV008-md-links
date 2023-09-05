// const { mdLinks } = require('./md-links');
// const { httpPeticion } = require('./node-methods');

// //Ejecucion: node cli.js https://github.com/SamCaro --validate

// const options = process.argv.slice(2);
// console.log(process.argv)
// console.log('La ruta es:', options[0]); // https://github.com/SamCaro
// console.log('La opcion es:', options[1]); // --validate
// const path = options[0];


// mdLinks(path, { validate: true })
//   .then(content => httpPeticion(content))
//   .then((result) => {
//     //----Total Links ----//
//     const totalHref = array => `Total: ${array.length}`
//     console.log(totalHref(result))
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const { mdLinks } = require('./md-links');
const { httpPeticion } = require('./node-methods');

const options = process.argv.slice(2);
console.log('La ruta es:', options[0]);
console.log('La opción es:', options[1]);

const path = options[0];
const validateOption = options.includes('--validate');

mdLinks(path, { validate: validateOption })
  .then((links) => {
    if (validateOption) {
      return Promise.all(links.map(httpPeticion));
    } else {
      return links;
    }
  })
  .then((result) => {
    result.forEach((link) => {
      if (validateOption) {
        console.log(`${link.fileName} ${link.href} ${link.ok} ${link.status} ${link.text}`);
      } else {
        console.log(`${link.fileName} ${link.href} ${link.text}`);
      }
    });
    console.log(`Total: ${result.length}`);
  })
  .catch((err) => {
    console.error(err);
  });

//  barras diagonales(/) convención en sistemas Unix (como Git Bash en Windows)