const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');
const Users = require('../models/user');

const suggestionsRouter = express.Router();

suggestionsRouter.use(bodyParser.json());

suggestionsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    console.log(req.query.searchTerm);
    var name=req.query.searchTerm;
    
    Users.find({username: { $regex: '.*' + name + '.*' }}).limit(5)
    .then((suggestions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(suggestions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /suggestions');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /suggestions');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /suggestions');    
});

module.exports = suggestionsRouter;