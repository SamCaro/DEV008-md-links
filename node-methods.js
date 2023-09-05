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
      const extractHref = extractLink.match(regexParentesisURL).join().slice(1, -1); //join() = convierte en una cadena de texto, une todo
      const extractText = extractLink.match(regexCorchetesURL).join().slice(1, -1); //match() = devuelve un array con todas las coincidencias o null

      return {
        href: extractHref,
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
//{ 
// href: 'https://github.com/',
// text: 'GitHub',
// fileName: 'otrosArchivos.md'
//},
// // // // fs.readFile('\README.md', (err, data) => {
// // // //   if (err) {
// // // //     console.log(err);
// // // //     return;
// // // //   }
// // // //   const arrResult = getLinks(data, '\README.md')
// // // //     .then(arrResult => {
// // // //       console.log(arrResult)
// // // //     })
// // // //     .catch(err => {
// // // //       console.log(err)
// // // //     })
// // // // });


//----Leer el contenido de los archivos----//
// # GitHub [GitHub](https://github.com/)
const readFileContent = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
};

// // // // readFileContent('\README.md')
// // // //   .then((data) => {
// // // //     console.log(data)
// // // //   })
// // // //   .catch((error) => {
// // // //     console.error(error);
// // // //   });


//----Petición HTTP usando Fetch ----//
// Libreria node-fetch = Permite que fetch funcione en el entorno Node.js
// //Fetch permite hacer solicitudes HTTP asincronas en el navegador
//const href = ('https://github.com/SamCaro')
//const href = ('http://www.google.com/')
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
  //const isURL = href.startsWith('http://') || href.startsWith('https://');
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i; // Expresión regular para URL
  if (urlRegex.test(href)) { // test() = verificar si una expresión regular coincide con una cadena de texto. Retorna boleano
    return fetch(href)
      .then((res) => {
        return res.text()
          .then((text) => ({
            url: res.url,
            text: text.split(' ', 10),
            fileName: href,
            status: res.status,
            ok: res.ok ? 'OK' : 'FAIL'
          }))
          .catch((err) => {
            console.log('Error al obtener el contenido de la respuesta', err);
            return {
              url: href,
              status: 404,
              ok: 'FAIL'
            };
          });
      })
      .catch((err) => {
        console.log('Error al hacer la solicitud HTTP', err);
        return {
          url: href,
          status: 404,
          ok: 'FAIL'
        };
      });
  } else {
    return readFileContent(href)
      .then((data) => ({
        url: 'file://' + href,
        text: data.split(' ', 10),
        fileName: href,
        status: 200,
        ok: 'OK'
      }))
      .catch((err) => {
        console.log('Error al leer el archivo local', err);
        return {
          url: href,
          status: 404,
          ok: 'FAIL'
        };
      });
  }
};
// // // // // // httpPeticion(href)
// // // // // //   .then((result) => {
// // // // // //     console.log(result);
// // // // // //   })
// // // // // //   .catch((error) => {
// // // // // //     console.error(error);
// // // // // //   });



module.exports = {
  pathExists,
  extensionOfPath,
  transformToAbsolute,
  getLinks,
  readFileContent,
  httpPeticion
};


// $ ls -d *  --> Los nombres de los elementos que tienen "@" al final son enlaces simbólicos,
//mientras que los que tienen "/" al final son directorios. ($ ls -d */)


