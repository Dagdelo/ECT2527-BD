const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const urlService = require('./url.service');

// routes
router.post('/', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        url: Joi.string().required(),
        hits: Joi.number().optional(),
        userId: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    urlService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    urlService.getAll()
        .then(urls => res.json(urls))
        .catch(next);
}

function getById(req, res, next) {
    urlService.getById(req.params.id)
        .then(url => res.json(url))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        url: Joi.string().empty(''),
        hits: Joi.number().empty(null),
        userId: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    urlService.update(req.params.id, req.body)
        .then(url => res.json(url))
        .catch(next);
}

function _delete(req, res, next) {
    urlService.delete(req.params.id)
        .then(() => res.json({ message: 'Url deleted successfully' }))
        .catch(next);
}