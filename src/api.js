const fs = require('fs');
const path = require('path');
//const axios = require('axios');

//console.log(module)

//---Validar si un archivo o directorio existe---
const pathExistsSync = (filePath) => fs.existsSync(filePath) // función  sincróna
//console.log(pathExistsSync('./noexiste.js')) //false
//console.log(pathExistsSync('./md-link.js')) //true
//--> function pathExistsSync(path) {
//     return fs.existsSync(path);
// }

//---Verificar si es una ruta absoluta---
const checkAbsolutePath = (filePath) => path.isAbsolute(filePath)
//console.log(transformToAbsolute('./api.js'))

//---Convierte una ruta ya sea relativa o absoluta a una ruta absoluta ---
const transformToAbsolute = (filePath) => path.resolve(filePath) // función sincróna
//console.log(toAbsoluteRoute('api.js'))
//console.log(toAbsoluteRoute('/Users'))
//console.log(toAbsoluteRoute('../../DEV008'))

//---Obtener la extensión del archivo---
const extensionOfPath = (filePath) => path.extname(filePath)
//console.log(extensionOfPath('C:\Users\USUARIO\DEV008\DEV008-md-links\README.md'))
//console.log(extensionOfPath('\README.md'))

//---Leer el contenido del archivo
const readFileContent = (filePath) => fs.readdirSync(filePath, 'utf-8')
//console.log(contentPath(''))

module.exports = {
  pathExistsSync,
  checkAbsolutePath,
  transformToAbsolute,
  extensionOfPath,
  readFileContent
};


// $ ls -d *  --> Los nombres de los elementos que tienen "@" al final son enlaces simbólicos, 
//mientras que los que tienen "/" al final son directorios. ($ ls -d */)