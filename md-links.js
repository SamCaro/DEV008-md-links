const { 
  pathExistsSync,
  extensionOfPath,
  readFileContent,
  transformToAbsolute,
  httpPeticion
} = require('./node-methods.js'); // desestructuración

// acceso directo a miembros o acceso a través del objeto.
// const module = require('./node-methods.js') 
// module.pathExistsSync() 


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => { // maneja la lógica asíncrona.
    // Verificar si la ruta existe y si tiene una extensión Markdown
    if (!pathExistsSync(path) || !extensionOfPath(path)) {
      //reject(`La ruta ${path} no existe`); // Si la ruta no existe, se rechaza la promesa
      reject('La ruta no existe o no es una ruta valida');
    } else {
      //Leer el archivo transformandolo a ruta absoluta 
      const absolutePath = transformToAbsolute(path)
      readFileContent(absolutePath) // Devuelve una promesa
        .then((data) => {
          console.log(data) // Yes yes yes!
        // Se hace una solicitud HTTP
         return httpPeticion(href); 
        })
        .then((result) => {
          //Se maneja el resultado de httpPeticion
          console.log(result) //  URL, text, status
          resolve(result) 
        })
        .catch((err) => {
          console.error(err)
          reject(err);
        });
    }
  });
};



module.exports = {
  mdLinks
};