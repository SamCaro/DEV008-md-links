const {
    pathExists,
    extensionOfPath,
    transformToAbsolute
} = require('../node-methods.js');

const validPath = './node-methods.js'
const invalidPath = '\\api.js'
const absolutPathMarkdown = 'C:\\Users\\USUARIO\\DEV008\\DEV008-md-links\\README.md'
const relativePathMarkdown = 'README.md'

describe('pathExistsSync', () => {
    it('Should be a function', () => {
        expect(typeof pathExists()).toBe('boolean')
    })
    it('Should return "true" if the path is valid.', () => {
        expect(pathExists(validPath)).toBe(true)
    })

    it('Should return "true" if the path is valid.', () => {
        expect(pathExists(validPath)).toBeTruthy()
    })

    it('Validar que la ruta no existe/false', () => {
        expect(pathExists(invalidPath)).toBe(false)
    })

    it('Should return "false" if there is no path.', () => {
        expect(pathExists(invalidPath)).toBeFalsy()
    })
});

describe('extensionOfPath', () => {
    it('Debe mostrar true, si la extension del archivo es .md', () => {
        expect(extensionOfPath(relativePathMarkdown)).toBe(true)
    })
    it('Debe devolver falso si no es una extension Markdown', () => {
        expect(extensionOfPath(invalidPath)).toBe(false)
    })
})

describe('transformToAbsolute', () => {
    it('Debe convertir una ruta relativa a absoluta', () => {
        expect(transformToAbsolute(relativePathMarkdown)).toBe(absolutPathMarkdown)
    })
})

// describe('readFileContent', () => {
//     it('Debe leer el contendo de un archivo', () => {
//         expect().toBe()
//     })
// })

// describe('Tests for async functions', () => {
//     test('httpPeticion should work correctly', () => {
//       return httpPeticion('https://github.com/SamCaro')
//         .then(result => {
//           expect(result.ok).toBe('OK');
//         });
//     });
// })

//toBeDefined(): Comprueba si el valor está definido (no es undefined).
//toContain(): Comprueba si un valor (como un elemento de un array) está contenido en otro valor (como un array).
//toMatch(): Comprueba si una cadena coincide con una expresión regular.
//expect(data).toEqual