const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
var User = require('../models/user');
const Commodity = require('../models/commodity');


const purchasedRouter = express.Router();
purchasedRouter.use(bodyParser.json());


purchasedRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    User.findById(req.user._id)
    .populate('onSale')
    .then((items) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items.purchased);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /purchased');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /purchased');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /purchased');
});

module.exports = purchasedRouter;