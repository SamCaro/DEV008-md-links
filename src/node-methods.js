const fs = require('fs'); 
const path = require('path');
const fetch = require('node-fetch');

//console.log(module)

// Función para validar si un archivo o directorio existe
const pathExists = (filePath) => fs.existsSync(filePath);

// Función para obtener la extensión del archivo Markdown
const extensionOfPath = (filePath) => path.extname(filePath) === '.md';

// Función para convertir una ruta (relativa o absoluta) en una ruta absoluta
const transformToAbsolute = (filePath) => path.resolve(filePath);

// Función para extraer los enlaces de un texto
const getLinks = (text, fileName) => {
  const regexMd = /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/g;
  const regexParentesisURL = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/;
  const regexCorchetesURL = /\[([\w\s\d]+)\]/g;

  const links = text.match(regexMd);
  if (!links) return [];

  return links.map((extractLink) => {
    const extractHref = extractLink.match(regexParentesisURL)[1];
    const extractText = extractLink.match(regexCorchetesURL).join().slice(1, -1);
    return {
      href: extractHref,
      text: extractText,
      fileName,
    };
  });
};

// Función para realizar peticiones HTTP a los enlaces
const httpPeticion = (links) => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  const promises = links.map((link) => {
    if (!urlRegex.test(link.href)) {
      return {
        url: link.href,
        status: 400,
        ok: 'FAIL',
        fileName: link.fileName,
      };
    }

    return fetch(link.href)
      .then((res) => {
        return {
          href: link.href,
          text: link.text,
          fileName: link.fileName,
          status: res.status,
          ok: res.ok ? 'OK' : 'FAIL',
        };
      })
      .catch(() => {
        return {
          href: link.href,
          text: link.text,
          fileName: link.fileName,
          status: 404,
          ok: 'FAIL',
        };
      });
  });

  return Promise.all(promises);
};

module.exports = {
  pathExists,
  extensionOfPath,
  transformToAbsolute,
  getLinks,
  httpPeticion
};
