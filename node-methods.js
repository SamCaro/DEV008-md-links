const fs = require('fs'); //manipulacion de archivos en node
const path = require('path'); // === const path = requiere('node:path');
const fetch = require('node-fetch'); // === const { default: fetch } = require('node-fetch');
const { get } = require('https');



//console.log(module)

//-----Validar si un archivo o directorio existe-----
const pathExistsSync = (filePath) => fs.existsSync(filePath) // función  sincróna
//console.log(pathExistsSync('./noexiste.js')) //false
//console.log(pathExistsSync('./md-link.js')) //true
//>>>>>>>> function pathExistsSync(path) {
//     return fs.existsSync(path);
// }




//-----Obtener la extensión del archivo Markdown-----
const extensionOfPath = (filePath) => {
  const fileExt = path.extname(filePath); 
  return fileExt === '.md' // boleano
}
// console.log(extensionOfPath('C:\Users\USUARIO\DEV008\DEV008-md-links\README.md')) // true
// console.log(extensionOfPath('\README.md'))  // true
// console.log(extensionOfPath('./text.text')) // false

//>>>>>>>>>>Verificar si es una ruta absoluta
//console.log(__dirname) // C:\Users\USUARIO\DEV008\DEV008-md-links\src // variable que nos indica el nombre del directorio del módulo que se está ejecutando.
//console.log(__filename) //C:\Users\USUARIO\DEV008\DEV008-md-links\src\node-methods.js
const checkAbsolutePath = (filePath) => path.isAbsolute(filePath)
//console.log(checkAbsolutePath('./api.js'))

//>>>>>>>>>>Obtener una ruta Absoluta de un archivo
const absolutePath = (filePath) => path.join(__dirname, filePath) //M'etodo join une el directorio actual con la ruta que tengo en el sistema
//console.log(absolutePath('./text.text')) //C:\Users\USUARIO\DEV008\DEV008-md-links\src\text.text // ruta absoluta
//console.log(absolutePath('api.js')) //C:\Users\USUARIO\DEV008\DEV008-md-links\src\api.js


//-----Convierte una ruta ya sea relativa o absoluta a una ruta absoluta // Genera siempre rutas absolutas-----
const transformToAbsolute = (filePath) => path.resolve(filePath) // función sincróna
// console.log(transformToAbsolute('api.js')) //C:\Users\USUARIO\DEV008\DEV008-md-links\src\api.js
// console.log(transformToAbsolute('/Users')) //C:\Users
// console.log(transformToAbsolute('../../DEV008')) //C:\Users\USUARIO\DEV008\DEV008



//>>>>>>>>>>Leer el contenido del archivo
//const readFileContent =  fs.readFileSync(absolutePath(filePath), "utf8") // función sincróna (primer parametro de la función getAbsolutePath es una ruta relativa)
//console.log(readFileContent) // yes yes yes

//-----Leer el contenido del archivo-----
const route = './README.md';
const filePath = './text.text'; // yes yes yes 
const readFileContent = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {  //callback con dos parametros (err, data)
      if (err) {
        reject(err);
      } else {
        resolve(data) //datos que se leen del archivo // yes yes yes
      }
    })
  })
}

//console.log(readFileContent(route)) // Promise { <pending> } // funcion asincrona que se resolverá con el resultado de la operación (.then) y error con (.catch)

readFileContent(route)
  .then((data) => {
    console.log(data); // se imprime el contenido del archivo
  })
  .catch((err) => {
    console.error(err); // Manejas cualquier error que pueda ocurrir
  });

  
//---Leer los archivos y extraer los links---//  
const content = './README.md'
const getLinks = (content) => {
  

    const regexMd = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/ //Coincide con enlaces completos y rutas relativas ----URL relativa (comenzando con /)como una URL absoluta (comenzando con http:// o https://://)----*/
   // const regexMdParentesis = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg //Coincide ccon URLs en formato Markdown que están entre paréntesis.--- Url () ---//
   // const regexMdCorchetes = /\[([\w\s\d]+)\]/g; // Coincide con enlaces en formato Markdown que están entre corchetes--- Nombre de Url [] ---//

    const links = content.match(regexMd)
    console.log(links)

    if(links) {
      return (links)
    } else {
     return []
    }
  }

console.log(getLinks(content))





//-----Leer el contenido del archivo-----
readFileContent('./text.text')
  .then((data) => {
    return getLinks(data, './text.text');
  })
  .then((links) => {
    console.log(links);
  })
  .catch((err) => {
    console.error(err); // Manejas cualquier error que pueda ocurrir en la lectura del archivo o en la extracción de links
  });

//---Petición HTTP usando Fetch
//Fetch permite hacer solicitudes HTTP asincronas en el navegador

const href = ('https://github.com/SamCaro')
//  {
//   url: 'https://github.com/SamCaro',
//   text: [Function: text],
//   file: undefined,
//   status: 200,
//   ok: 'OK'
// }
//const href = ('http://example.com/movies.json')
// {
//   url: 'http://example.com/movies.json',
//   text: [Function: text],
//   file: undefined,
//   status: 404,
//   ok: 'FAIL'
// }

const httpPeticion = (href) => {
  return fetch(href)
    .then((res) => {
      //console.log(res)
      //console.log(
      return ({
        url: res.url,
        text: res.text,
        file: res.file, // undefined,
        status: res.status,
        ok: res.ok ? 'OK' : 'FAIL' // Es una forma abreviada y concisa de realizar una declaración if-else.
      })
      // )
    })
    .catch((err) => {
      console.log('La URL no es valida', err)
    })
  // .catch(()=> ({
  //  url: res.url,
  //  status: 404,
  //  ok: 'FAIL'
  //  }))
}

module.exports = {
  pathExistsSync,
  checkAbsolutePath,
  extensionOfPath,
  readFileContent,
  transformToAbsolute,
  httpPeticion
};


// $ ls -d *  --> Los nombres de los elementos que tienen "@" al final son enlaces simbólicos,
//mientras que los que tienen "/" al final son directorios. ($ ls -d */)