const {
    pathExistsSync,
    checkAbsolutePath,
    transformToAbsolute,
    extensionOfPath
} = require('../src/api.js');

const validPath = 'src\\api.js'
const invalidPath = '\\src\\api.js'
const absolutPathMarkdown = 'C:\\Users\\USUARIO\\DEV008\\DEV008-md-links\\README.md'
const relativePathMarkdown = 'README.md'

describe('pathExistsSync', () => {
    it('Should be a function', () => {
        expect(typeof pathExistsSync).toBe('function')
    })
    it('Should return "true" if the path is valid.', () => {
        expect(pathExistsSync(validPath)).toBe(true)
    })

    it('Should return "true" if the path is valid.', () => {
        expect(pathExistsSync(validPath)).toBeTruthy()
    })

    it('Validar que la ruta no existe/false', () => {
        expect(pathExistsSync(invalidPath)).toBe(false)
    })

    it('Should return "false" if there is no path.', () => {
        expect(pathExistsSync(invalidPath)).toBeFalsy()
    })
});

describe('checkAbsolutePath', () => {
    it('Should be a function', () => {
        expect(typeof checkAbsolutePath).toBe('function')
    })
    it('Debe retornar "true" si es una ruta absoluta.', () => {
        expect(checkAbsolutePath(absolutPathMarkdown)).toBeTruthy()
    })
})

describe('transformToAbsolute', () => {
    it('Debe convertir una ruta relativa a absoluta', () => {
        expect(transformToAbsolute(relativePathMarkdown)).toBe(absolutPathMarkdown)
    })
})

describe('extensionOfPath', () => {
    it('Debe mostrar la extencion de los archivos.', () => {
        expect(extensionOfPath(relativePathMarkdown)).toBe('.md')
    })
    it('Debe devolver una cadena vacia si es una ruta valida pero sin extensión de archivo', () => {
        expect(extensionOfPath('./eslintrc')).toBe('')
    })
})


//toBeDefined(): Comprueba si el valor está definido (no es undefined).
//toContain(): Comprueba si un valor (como un elemento de un array) está contenido en otro valor (como un array).
//toMatch(): Comprueba si una cadena coincide con una expresión regular.
//expect(data).toEqual