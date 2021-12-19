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
    Commodity.find({_id:req.body.id})
    .populate('seller')
    .then((item) => {
        User.findOne({_id:req.user._id})
        .then((buyer) => {
            var purchasedItem = {
                seller: item.seller._id,
                itemname: item.itemname,
                price: item.price,
                category: item.category,
                image: item.image
            };

            buyer.purchased.concat([purchasedItem]);
            buyer.save((err, buyer) => {
                if (err) {
                    console.log(buyer);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: err});
                    return ;
                }
                else{
                    User.findById(item.seller._id)
                    .then((seller) => {
                        var index = seller.onSale.indexOf(item._id)
                        console.log(index);
                        if(index > -1) {
                            seller.onSale.splice(index,1);
                        }
                        seller.save((err,seller) => {
                            if (err) {
                                console.log(seller);
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