const fs = require('fs'); //manipulacion de archivos en node
const path = require('path'); // === const path = requiere('node:path');
const fetch = require('node-fetch'); // === const { default: fetch } = require('node-fetch');

// //console.log(module)

//-----Validar si un archivo o directorio existe-----//
const pathExists = (filePath) => fs.existsSync(filePath) // función  sincróna
//console.log(pathExistsSync('./noexiste.js')) //false
// //console.log(pathExistsSync('./md-link.js')) //true
// //>>>>>>>> function pathExistsSync(path) {
// //     return fs.existsSync(path);
// //} 


//-----Obtener la extensión del archivo Markdown-----
const extensionOfPath = (filePath) => {
  const fileExt = path.extname(filePath);
  return fileExt === '.md' // boleano
}
// // console.log(extensionOfPath('C:\Users\USUARIO\DEV008\DEV008-md-links\README.md')) // true
// // console.log(extensionOfPath('\README.md'))  // true
// // console.log(extensionOfPath('./text.text')) // false


//-----Convierte una ruta ya sea relativa o absoluta a una ruta absoluta // Genera siempre rutas absolutas-----
const transformToAbsolute = (filePath) => path.resolve(filePath) // función sincróna
// // console.log(transformToAbsolute('api.js')) //C:\Users\USUARIO\DEV008\DEV008-md-links\src\api.js
// // console.log(transformToAbsolute('/Users')) //C:\Users
// // console.log(transformToAbsolute('../../DEV008')) //C:\Users\USUARIO\DEV008\DEV008


// //>>>>>>>>>>Verificar si es una ruta absoluta
// //console.log(__dirname) // C:\Users\USUARIO\DEV008\DEV008-md-links\src // variable que nos indica el nombre del directorio del módulo que se está ejecutando.
// //console.log(__filename) //C:\Users\USUARIO\DEV008\DEV008-md-links\src\node-methods.js
// const checkAbsolutePath = (filePath) => path.isAbsolute(filePath)
// //console.log(checkAbsolutePath('./api.js'))

// //>>>>>>>>>>Obtener una ruta Absoluta de un archivo
//const absolutePath = (filePath) => path.join(__dirname, filePath) //M'etodo join une el directorio actual con la ruta que tengo en el sistema
// //console.log(absolutePath('./text.text')) //C:\Users\USUARIO\DEV008\DEV008-md-links\src\text.text // ruta absoluta
// //console.log(absolutePath('api.js')) //C:\Users\USUARIO\DEV008\DEV008-md-links\src\api.js



//---extraer los links---//  
const getLinks = (content, fileName) => new Promise((resolve) => {
  const regexMd = /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
  const regexParentesisURL = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
  const regexCorchetesURL = /\[([\w\s\d]+)\]/g;

  const links = content.match(regexMd);
  let arrayLinks;
  if (links) {
    arrayLinks = links.map((extractLink) => {
      const extracthref = extractLink.match(regexParentesisURL).join().slice(1, -1);
      const extractText = extractLink.match(regexCorchetesURL).join().slice(1, -1);

      return {
        href: extracthref,
        text: extractText,
        fileName: fileName,
      };
    });
    resolve(arrayLinks);
  } else if (links === null) {
    resolve([]);
  }
});

//----Leer el contenido de los archivos----//
fs.readFile('documents-mds/otrosArchivos.md', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const arrResult = getLinks(data, 'otrosArchivos.md')
    .then(arrResult => {
      console.log(arrResult)
    })
    .catch(err => {
      console.error(err)
    })
 });


// //---Petición HTTP usando Fetch
// //Fetch permite hacer solicitudes HTTP asincronas en el navegador

const href = ('https://github.com/SamCaro')
// //  {
// //   url: 'https://github.com/SamCaro',
// //  text: [ \n\n<!DOCTYPE....50 caracteres],
// //   status: 200,
// //   ok: 'OK'
// // }
//const href = ('http://example.com/movies.json')
// // {
// //   url: 'http://example.com/movies.json',
// //   text: [ <!doctype'...50 caracteres],
// //   status: 404,
// //   ok: 'FAIL'
// // }

const httpPeticion = (href) => {
  return fetch(href)
    .then((res) => {
      return res.text() // Obtiene el contenido de la respuesta como texto
        .then((text) => ({
          url: res.url,
          text: text.split(' ', 50),
          fileName: href,
          status: res.status,
          ok: res.ok ? 'OK' : 'FAIL'
        }));
    })
    .catch((err) => {
      console.log('La URL no es válida', err);
      return {
        url: href,
        status: 404,
        ok: 'FAIL'
      };
    });
};

httpPeticion(href)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = {
  pathExists,
  extensionOfPath,
  transformToAbsolute,
  getLinks,
  httpPeticion
};


// $ ls -d *  --> Los nombres de los elementos que tienen "@" al final son enlaces simbólicos,
//mientras que los que tienen "/" al final son directorios. ($ ls -d */)


