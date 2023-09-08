const {
    pathExists,
    extensionOfPath,
    transformToAbsolute,
    getLinks,
    httpPeticion
} = require('../node-methods');

const path = 'C:\\Users\\USUARIO\\DEV008\\DEV008-md-links\\README.md';
const pathVacio = 'C:\Users\USUARIO\DEV008\DEV008-md-links\test\test-pruebas\prueba-path-valid.md'
const absolutPathMarkdown = 'C:\\Users\\USUARIO\\DEV008\\DEV008-md-links\\README.md'
const relativePathMarkdown = 'README.md'
const invalidPath = 'ruta_invalida.txt';

describe('pathExistsSync', () => {
    it('Debe ser Boleano', () => {
        expect(typeof pathExists()).toBe('boolean')
    })
    it('Should return "true" if the path is valid.', () => {
        expect(pathExists(path)).toBe(true)
    })

    it('Should return "true" if the path is valid.', () => {
        expect(pathExists(path)).toBeTruthy()
    })

    it('Validar que la ruta no existe/false', () => {
        expect(pathExists(invalidPath)).toBe(false)
    })

    it('Should return "false" if there is no path.', () => {
        expect(pathExists(pathVacio)).toBeFalsy()
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

describe('getLinks', () => {
    it('Debe ser una Funcion', () => {
        expect(typeof getLinks).toBe('function')
    })
    it('Debe extraer el contenido de enlaces markdown', () => {
        const text = '[Google](http://www.google.com)';
        const fileName = 'C:\\Users\\USUARIO\\DEV008\\DEV008-md-links\\src\\documents-mds\\otrosArchivos.md';

        const links = getLinks(text, fileName);

        expect(links).toEqual([
            {
                href: 'http://www.google.com',
                text: 'Google',
                fileName: "C:\\Users\\USUARIO\\DEV008\\DEV008-md-links\\src\\documents-mds\\otrosArchivos.md",
            },
        ]);
    });


});



describe('httpPeticion', () => {
    it('Debe retornar una peticion HTTP OK', () => {
        const links = [
            { href: 'https://www.laboratoria.la/', text: 'Laboratoria', fileName: 'example.md' },
            { href: 'https://app.slack.com/client/T0NNB6T0R/C054M5X8M6D', text: 'Slack', fileName: 'example.md' },
        ];

        return httpPeticion(links)
            .then(results => {
                results.forEach(result => {
                    expect(result.ok).toBe('OK');
                });
            });
    });



    it('Debe retornar un peticion HTTP FAIL', () => {
        const links2 = ['https://samcaro.github.io/', 'htttttp://google.com']

        return httpPeticion(links2)
            .then(results => {
                results.forEach(result => {
                    expect(result.ok).toBe('FAIL')
                })
            })
    })
    it('Debe retornar un arreglo con estado FAIL para un enlace que no responde (HTTP 404)', () => {

        return httpPeticion(['hhttp://labo.com/noexist', 'htttttp://google.com'])
            .then(results => {
                results.forEach(result => {
                    expect(result.status).toBe(400)
                    expect(result.ok).toBe('FAIL')
                })
            })
    })
})
