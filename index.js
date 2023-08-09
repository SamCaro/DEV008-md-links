module.exports = () => {
  console.log(':)')
};

module.exports = (base) => {
  //return base + 10
  return new Promise((resolve, reject) => {
    const suma = base + 10
    //resolve(suma)
    reject('PASA ALGO');
  })
};



//const fs = require('fs');

// const mdLinks = (path, options) => {
//   return new Promise((resolve, reject) => {
//     // Verificar si la ruta existe --> const pathExists = fs.existsSync('/path/to/file'); // true or false
//     if (fs.existsSync(path)) {
//       // Chequear o convertir a una ruta obsoluta.
//       // Probar si esa ruta Absoluta es un Archivo o un Directorio
//       // Si es un directorio filtrar los archivos md.

//       // Implementa aquí la lógica para leer y analizar los archivos Markdown.
//       // Puedes utilizar la biblioteca markdown-it o remark para realizar el análisis.
//       // Luego, resuelve la promesa con los enlaces encontrados.
//       // Ejemplo:
      
//       // const links = [
//       //   {
//       //     href: 'https://example.com',
//       //     text: 'Example',
//       //     file: '/path/to/file.md',
//       //   },
//       // ];
//       // resolve(links);
//     } else {
//       // Si no existe la ruta, rechaza la promesa.
//       reject('La ruta no existe');
//     }
//   });
// }

// module.exports = mdLinks;


// resolve(value) – resuelto: si el trabajo finalizó con éxito, con el resultado value.
// reject(error) – rechazado: si ocurrió un error, con un objeto error.