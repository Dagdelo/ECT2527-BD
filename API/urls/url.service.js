const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { encode, decode } = require('../_helpers/base58');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
}

async function getAll() {
    return await db.Url.findAll({include: [{model: db.User, as: 'User'}], attributes: {exclude: ['userId']}});
}

async function getById(id) {
    return await getUrl(id);
}

async function create(params) {
    // validate
    if (await db.Url.findOne({ where: { url: params.url } })) {
        throw 'Url "' + params.url + '" is already taken';
    }

    // save url
    console.log('URL CREATE -> ', params)
    await db.Url.create(params);
}

async function update(id, params) {
    const url = await getById(id);

    // validate
    // console.log("URL Validation", params.url, url.url, url.url === params.url)
    const urlChanged = params.url && url.url !== params.url;
    if (urlChanged && await db.Url.findOne({ where: { url: params.url } })) {
        throw 'url "' + params.url + '" is already taken';
    }
    const userChanged = params.userId && url.userId !== params.userId;
    const userExists = await db.User.findOne({ where: { id: params.userId}});
    if (userChanged && !userExists) {
        throw 'New user not found!';
    }
    const hitsChanged = params.hits && url.hits !== params.hits;
    if (hitsChanged && params.hits < 0) {
        throw 'Hits cannot be negative!';
    }
    if (!urlChanged && !userChanged && !hitsChanged) {
        throw 'Nothing to change';
    }

    // copy params to user and save
    Object.assign(url, params);
    await url.save();

    return url.get();
}

async function _delete(id) {
    const url = await getUrl(id);
    await url.destroy();
}

// helper functions

async function getUrl(id) {
    const url = await db.Url.findByPk(id);
    if (!url) throw 'url not found';
    return url;
}