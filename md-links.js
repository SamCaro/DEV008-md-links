const {
  pathExists,
  extensionOfPath,
  transformToAbsolute,
  readFileContent,
  httpPeticion,
  getLinks
} = require('./node-methods'); // desestructuración

// acceso directo a miembros o acceso a través del objeto.
// const module = require('./node-methods.js') 
// module.pathExistsSync() 

const mdLinks = (path, options = { validate: false }) => {
  return new Promise((resolve, reject) => { // maneja la lógica asíncrona.
    // Verificar si la ruta existe y si tiene una extensión Markdown
    if (!pathExists(path) || !extensionOfPath(path)) {
      reject('La ruta no existe o no es una ruta valida');  // Si la ruta no existe, se rechaza la promesa
    } else {
      //Si la ruta es valida, se transforma a una ruta absoluta
      const absolutePath = transformToAbsolute(path)
      //Se lee el contenido del archivo
      readFileContent(absolutePath) // Devuelve una promesa
       .then((data) => {
        //if(data) {
          //Se resuelve la promesa extrayendo u obteniendo los enlaces 
          const arrayLinks = getLinks(absolutePath, data)
          //Si el array de enlaces es vacio se rechaza la promesa
          if (arrayLinks.length === 0) {
            reject('La ruta no tiene links')
          } else {
            //Si hay enlaces en el array la validacion es verdadera
            if (options.validate === true) { // = (options.validate)
              // Se resuelve la promesa mostrando el array de enlaces
              resolve(arrayLinks)
            } else {
              //Si la validacion es falsa, se hace una solicitud HTTP para verificar el estado de los enlaces 
              const arrayLinkstatus = httpPeticion(arrayLinks)
              //Se resuelve la promesa mostrando el array de enlaces que se verifico
              resolve(arrayLinkstatus)
            }
          }
        })
       // }
        //Si algun proceso sale mal se rechaza la promesa y muestra el error 
        .catch((err) => {
         // else {
          console.log(err, 'La ruta no existe o no es una ruta valida')
          reject(err);
        })
       // };
    }
  });
};

//console.log(typeof mdLinks)

module.exports = {
  mdLinks
};