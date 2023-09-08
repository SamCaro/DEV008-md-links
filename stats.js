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


module.exports = { statsLinks };