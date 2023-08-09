const mdLinks = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

  // it('should return a promise', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });

  it('Debe rechazar o fallar cuando el path no existe', () => {
    // test asincrono
    return mdLinks('/usuario/DEV008/noexiste.md').catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  });
});
