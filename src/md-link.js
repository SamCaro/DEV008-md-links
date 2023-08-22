const {
  pathExistsSync,
  readFileContent
} = require('./api.js');

const markdownIt = requiere('markdown-it');
const md = new markdownIt();

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (!pathExistsSync(path)) {
      //reject(`La ruta ${path} no existe`);
      reject('La ruta no existe');
    } else {
      //---Leer el contenido del archivo
      const content = readFileContent(path);

      //---Encontrar los enlaces 
      const tokens = md.parse(content, {})
      //console.log()

      //---Extraer los enlaces
      const links = tokens.filter(token => token.type === 'link_open')

      resolve(links);
    }
  });
};
// Esperar a que todas las promesas se resuelvan

//     .then(() => {
//         resolve();
//     })
//     .catch((error) => {
//         reject(error);
//     });
module.exports = {
  mdLinks
};