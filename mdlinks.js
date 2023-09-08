const {
  pathExists,
  extensionOfPath,
  transformToAbsolute,
  httpPeticion,
  getLinks
} = require('./node-methods'); // desestructuración

const fs = require('fs'); 

const mdLinks = (filePath) => {
  const absolutePath = transformToAbsolute(filePath);

  if (!pathExists(absolutePath) || !extensionOfPath(absolutePath)) {
    return Promise.reject(new Error('Archivo Markdown no encontrado.'));
  }

  return fs.promises.readFile(absolutePath, 'utf8')
    .then((content) => {
      const links = getLinks(content, absolutePath);
      if (links.length === 0) {
        return [];
      }
      return httpPeticion(links);
    });
};




mdLinks('otrosArchivos.md')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });


module.exports = {
  mdLinks
};