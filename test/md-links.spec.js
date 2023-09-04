const { mdLinks } = require('../md-links');

const pathError = '/usuario/DEV008/DEV008-md-links/noexiste'
const path = 'C:\Users\USUARIO\DEV008\DEV008-md-links\test\test-pruebas'
const pathVacio = 'test\test-pruebas\prueba-path-vacio.md'
//const pathOK = 'C:\Users\USUARIO\DEV008\DEV008-md-links\test\test-pruebas\prueba-path-valid.md' // absoluta
const pathOK = 'test\test-pruebas\prueba-path-valid.md' // relativa 
//const pathOK = 'test\test-pruebas\text.text'
//const pathOK = 'test\test-pruebas\noexiste'
const arrLinksTestFAIL = [
    {
        href: 'https://www.laboratoria./',
        text: 'L+ FAIL',
        fileName: 'C:\Users\USUARIO\DEV008\DEV008-md-links\test\test-pruebas\prueba-path-OK-FAIL.md',
        status: 404,
        ok: 'FAIL'
    },
]
const arrLinksTestOK = [
    {
        url: 'http://www.google.com/',
        text: ['<!doctype'],
        fileName: 'http://www.google.com/',
        status: 200,
        ok: 'OK'
    },
]

describe('mdLinks', () => {
    it('should be a function', () => {
        expect(typeof mdLinks).toBe('function');
    })

    it('Debe retornar una promesa', () => {
        return mdLinks((path) instanceof Promise)
            .then(result => {
                expect(result).toBe(true)
            })
            .catch((err) => {
                return err
            })
    })

    it('Debe rechazar o fallar cuando el path es un enlace vacio', () => {
        return expect(mdLinks(pathVacio)).rejects.toMatch('La ruta no existe o no es una ruta valida')
    })

    it('Debe rechazar o fallar cuando el path no existe ', () => {
        return expect(mdLinks(pathError)).rejects.toMatch('La ruta no existe o no es una ruta valida')
    })

    it('Debe resolver cuando el path existe', () => {
        return mdLinks(path)
            .then((result) => {
                expect(result).resolves(path)
            })
            .catch((err) => {
                return err
            })
    })

    it('Deberia retornar un arreglo de objetos FAIL en validate: false', () => {
        return mdLinks(path, { validate: false })
            .then(result => {
                expect(result).toMatch(arrLinksTestFAIL)
            })
            .catch((err) => { 
                return err;
            })
    })

    it('Debe retornar un arreglo vacio en validate: false', () => {
        return mdLinks(pathOK, { validate: false })
        .then((result) => {
            expect(result).toEqual([])
        })
        .catch(err => {
            return err
        })
    })

    it('Debe retornar un arreglo de objetos OK en validate: true ', () => {
        return mdLinks(pathOK, { validate: true })
            .then(result => {
                expect(result).toMatch(arrLinksTestOK)
            })
            .catch((err) => {
                return err;
            })
    })

  it('Debe retornar un arreglo con estado FAIL para un enlace que no responde (HTTP 404)', () => {
    return mdLinks(pathError)
    .then(result => {
        expect(result.status).toBe(404)
        expect(result.ok).toBe('FAIL')
    })
    .catch((err) => {
        return err
    })
  })
})


// toMatch = comprueba que una cadena coincide con una expresión regular.