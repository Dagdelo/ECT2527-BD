const db = require('_helpers/db');
const urlService = require('../urls/url.service');

module.exports = {
    redirect
}

async function redirect(id) {
    const url = await db.Url.findByPk(id);
    if (!url) throw 'url not found';
    url.hits++;
    urlService.update(id, url);
    return url.url;
}