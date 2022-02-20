const redirectService = require('../redirect/redirect.service');

module.exports = redirectTo;

async function redirectTo(req, res, next) {
    redirectService.redirect(req.params.id)
        .then(url => {
            req.url = url
            next()
        })
        .catch(next)
}