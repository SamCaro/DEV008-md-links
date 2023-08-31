const { mdLinks } = require('../md-links.js');

describe('mdLinks', () => {
     it('Debe rechazar o fallar cuando el path no existe', () => {
        // test asincrono
        return mdLinks('/usuario/DEV008/DEV008-md-links/noexiste.md') 
            .catch((error) => {
                expect(error).toBe('La ruta no existe o no es una ruta valida');
            });
    });   
});


