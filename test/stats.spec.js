const { statsLinks } = require('../stats');

const links = [
    { href: 'http://sc.com', status: 400 },
    { href: 'http://sc.com', status: 404 },
    { href: 'https://github.com/SamCaro', status: 200 },
];

describe('statsLinks', () => {
    it('Deberia retornar un arreglo con la cantidad de links y links unicos.', () => {
        expect(statsLinks(links)).toEqual({ Total: 3, Unique: 2 })
    })
})