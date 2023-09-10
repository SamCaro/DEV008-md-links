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

    fs.readFile(absolutePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const links = getLinks(data, absolutePath);
      if (links.length === 0) {
        resolve([]);
        return;
      }
  
      httpPeticion(links)
        .then((result) => {
          resolve(result); 
        })
        .catch((err) => {
          reject(err); 
        });
    });
  });
};




module.exports = {
  mdLinks
};
