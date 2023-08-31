const {
  pathExists,
  extensionOfPath,
  readFileContent,
  transformToAbsolute,
  httpPeticion,
  getLinks
} = require('./node-methods.js'); // desestructuración

// acceso directo a miembros o acceso a través del objeto.
// const module = require('./node-methods.js') 
// module.pathExistsSync() 


const mdLinks = (path, option = { validate: false }) => {
  return new Promise((resolve, reject) => { // maneja la lógica asíncrona.
    // Verificar si la ruta existe y si tiene una extensión Markdown
    if (!pathExists(path) || !extensionOfPath(path)) {
      reject('La ruta no existe o no es una ruta valida');  // Si la ruta no existe, se rechaza la promesa
    } else {
      //Leer el archivo transformandolo a ruta absoluta 
      const absolutePath = transformToAbsolute(path)
      readFileContent(absolutePath) // Devuelve una promesa
        .then((data) => {
          const arrayLinks = getLinks(absolutePath, data)

          if (arrayLinks.length === 0) {
            reject('La ruta no tiene links')
          } else {
            if (option.validate === true) {
              resolve(arrayLinks)
            } else {
              const arrayLinkstatus = httpPeticion(arrayLinks)
              resolve(arrayLinkstatus)
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};



module.exports = {
  mdLinks
};