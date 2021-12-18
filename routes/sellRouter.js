const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

var authenticate = require('../authenticate');
const cors = require('./cors');
const Commodity = require('../models/commodity');
const Users = require('../models/user');
const sellRouter = express.Router();

sellRouter.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/items');
    },

    filename: (req, file, cb) => {
        console.lof(req.body);
        cb(null, file.originalname )
    }
});

const upload = multer({ storage : storage}); 



sellRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Commodity.find(req.query)
    .populate('seller')
    .then((items) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, upload.single('itemImage'), (req, res, next) => {
    console.log(req.body);
    if (req.body != null) {
        console.log(req.user._id);
        console.log(req.body);
        var item = new Commodity({
            seller: req.user._id,
            itemname: req.body.itemname,
            price: req.body.price,
            category: req.body.category,
            image: req.file.originalname
        })
        item.save()
        .then((item) => {
            Users.findById(req.user._id)
            .then((user) => {
                console.log(user.username);
                console.log(req.body);
                user.onSale = user.onSale.concat([item]);
                user.save();
                console.log("success");
                Commodity.findById(item._id)
                .populate('seller')
                .then((item) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(item);
                }, (err => next(err)))
                .catch((err) => next(err));
            }, (err => next(err)))
            .catch((err) => next(err));
        }, (err => next(err)))
        .catch((err) => next(err));      
    }
    else {
        err = new Error('Courses not found in request body');
        err.status = 404;
        return next(err);
    }

})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
// .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
//     Dishes.remove({})
//     .then((resp) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));    
// });

// dishRouter.route('/:dishId')
// .options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
// .get(cors.cors, (req,res,next) => {
//     Dishes.findById(req.params.dishId)
//     .populate('comments.author')
//     .then((dish) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(dish);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
//     res.statusCode = 403;
//     res.end('POST operation not supported on /dishes/'+ req.params.dishId);
// })
// .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
//     Dishes.findByIdAndUpdate(req.params.dishId, {
//         $set: req.body
//     }, { new: true })
//     .then((dish) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(dish);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
//     Dishes.findByIdAndRemove(req.params.dishId)
//     .then((resp) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });


module.exports = sellRouter;