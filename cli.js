// script de línea de comandos (CLI) en JavaScript que utiliza Node.js.
const { mdLinks } = require('./src/mdlinks');
const { statsLinks } = require('./src/stats.js');

const args = process.argv.slice(2);
const path = args[0];
const stats = args.includes('--stats');
const validate = args.includes('--validate');

const cli = () => {
  if (args.length === 0 || args.includes('--help') || !path) {
    console.log('Uso: md-links <path> [opciones]');
    console.log('Opciones:');
    console.log('--validate  Comprueba el estado de los enlaces.');
    console.log('--stats     Muestra estadísticas de los enlaces.');
    console.log('Ejemplo: cli  README.md --validate --stats');
  } else { 
  mdLinks(path, { validate, stats })
    .then((links) => {
      if (validate) {
        console.log(links)
      }
      if (stats) {
        console.log(statsLinks(links, true))
      }
      if (!validate && !stats) {
        console.log('Ingresa la opcion que desees validar')
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

cli();

