const { mdLinks } = require('../src/md-link.js');

describe('mdLinks', () => {
     it('Debe rechazar o fallar cuando el path no existe', () => {
        // test asincrono
        return mdLinks('/usuario/DEV008/DEV008-md-links/noexiste.md')
            .then() 
            .catch((error) => {
                expect(error).toBe('La ruta no existe');
            });
    });

   
});


