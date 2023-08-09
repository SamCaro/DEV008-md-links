// Aqui se van a leer los argumentos de linea de   comandos y pasarlos a mdLinks
const mdLinks = require('./index.js');
mdLinks('/noexiste/').then(() => {

})
.catch((error) => {
    console.log(error)
});
