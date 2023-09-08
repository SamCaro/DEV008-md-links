// script de línea de comandos (CLI) en JavaScript que utiliza Node.js.
const process = require('process');
const { mdLinks } = require('./mdlinks.js');
const { httpPeticion } = require('./node-methods.js');
const { statsLinks } = require('./stats.js');

const arguments = process.argv.slice(2);
const path = arguments[0];
console.log(typeof path)
const options = arguments[1];
console.log(typeof options)
const stats = arguments.includes('--stats');
const validate = arguments.includes('--validate');

let contadorIteraciones = 0;

const cli = () => {
  if (!path) {
    console.log('ERROR: Debes ingresar una ruta.');
    return;
  }

  if (path && !validate && !stats) {
    mdLinks(path, { validate: false })
      .then((resp) => {
        resp.forEach((respLink) => {
          console.log('Resultado mdlinks link', respLink);
        })
        // .catch((err) => {
        //   console.log('ERROR:', err);
        // });
      });
  } else if ((validate && stats) || (stats && validate)) {
    mdLinks(path, { validate: true })
      .then((content) => httpPeticion(content))
      .then((resp) => {
        console.log(statsLinks(resp, true));
      })
      .catch((err) => {
        console.log('ERROR:', err);
      });
  } else if (validate && !stats) {
    mdLinks(path, { validate: true })
      .then((array) => httpPeticion(array))
      .catch((err) => {
        console.log('ERROR:', err);
      });
  } else if (stats && !validate) {
    mdLinks(path, { validate: false })
      .then((resp) => {
        console.log(statsLinks(resp, true));
      })
      .catch((err) => {
        console.log('ERROR:', err);
      });
  }

  contadorIteraciones++; //Incrementa el contador de iteraciones
  //Condicion de parada: verifica si se han procesado todos los archivos o si se ha alcanzado 10 iteraciones 
  if(contadorIteraciones < 1) {
    cli()
  }
};

cli();

// mdLinks('read.md', options)
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.error(error);
//   });