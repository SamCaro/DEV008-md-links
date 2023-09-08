const fs = require('fs'); 
const {
  pathExists,
  extensionOfPath,
  transformToAbsolute,
  httpPeticion,
  getLinks
} = require('./node-methods'); 


const mdLinks = (filePath) => {
  const absolutePath = transformToAbsolute(filePath);

  return new Promise((resolve, reject) => {
    if (!pathExists(absolutePath) || !extensionOfPath(absolutePath)) {
      reject(new Error('Archivo Markdown no encontrado.'));
      return;
    }

    fs.promises.readFile(absolutePath, 'utf8')
      .then((content) => {
        const links = getLinks(content, absolutePath);
        if (links.length === 0) {
          resolve([]);
        } else {
          resolve(httpPeticion(links));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};



module.exports = {
  mdLinks
};