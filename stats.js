const links = [
    { href: 'http://sc.com', status: 400 },
    { href: 'http://sc.com', status: 404 },
    { href: 'https://github.com/SamCaro', status: 200 },
    'https://samcaro.github.io/DEV008-data-lovers-League-of-Legends/',
];

//const links = 'otrosArchivos.md'

const brokenLink = (link) => link.status >= 400
const internalLink = (link) => link.status === 'Es un enlace interno'

const statsLinks = (links, validate = false) => {
    const totalHref = links.length
    const uniqueHref = [...new Set(links.map((link) => link.href))]
    const stats = {
        Total: totalHref,
        Unique: uniqueHref.length
    }

    if (validate) {
        stats.broken = links.filter(brokenLink).length
        stats.internalLink = links.filter(internalLink).length
    }
    return stats
}
//console.log(statsLinks(links, true));



  

module.exports = { statsLinks };