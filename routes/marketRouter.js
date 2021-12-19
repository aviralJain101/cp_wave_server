const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
var User = require('../models/user');
const Commodity = require('../models/commodity');


const marketRouter = express.Router();
marketRouter.use(bodyParser.json());


marketRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Commodity.find()
    .populate('seller')
    .then((items) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    console.log(req.body);
    if(req.body != null) {

        
        Commodity.findOne({_id:req.body.id})
        .populate('seller')
        .then((item) => {
            User.findOne({_id:req.user._id})
            .then((buyer) => {
                var purchasedItem = {
                    'seller': item.seller._id,
                    'itemname': item.itemname,
                    'price': item.price,
                    'category': item.category,
                    'image': item.image
                };
                // dish.comments = dish.comments.concat([req.body]);
                // buyer.purchased = buyer.purchased.concat([purchasedItem]);
                buyer.purchased.push(purchasedItem);

                buyer.save((err, buyer) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({err: err});
                        return ;
                    }
                    else{
                        User.findOne({_id:item.seller._id})
                        .then((seller) => {
                            var index = seller.onSale.indexOf(item._id)
                            if(index > -1) {
                                seller.onSale.splice(index,1);
                            }
                            seller.save((err,seller) => {
                                if (err) {
                                    res.statusCode = 500;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json({err: err});
                                    return ;
                                }
                                else {
                                    Commodity.findByIdAndRemove(req.body.id)
                                    .then((resp) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(resp);
                                    }, (err) => next(err))
                                    .catch((err) => next(err));
                                }
                            })
                        }, err => next(err))
                        .catch(err => next(err));
                    }
                })
            }, err => next(err))
            .catch(err => next(err));
        }, err => next(err))
        .catch(err => next(err));
    }
    else {
        err = new Error('Courses not found in request body');
        err.status = 404;
        return next(err);
    }

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.json({success: true});
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /market');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /market');
});

// .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
//     Dishes.remove({})
//     .then((resp) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));    
// });

module.exports = marketRouter;