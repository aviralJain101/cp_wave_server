const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
var User = require('../models/user');
const Commodity = require('../models/commodity');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage : storage}).single('itemImage');  



const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());



uploadRouter.route('/')
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
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    upload(req,res,function(err) {  
        if(err) { 
            // err = new Error('error upoading file');
            // err.status = 500;
            res.statusCode=500;
            res.end({errMess:"error while uploading"});
            // return next(err);
        }
        else {

            var item = new Commodity({
                seller: req.user._id,
                itemname: req.body.itemname,
                price: req.body.price,
                category: req.body.category,
                image: 'images/'+req.file.originalname
            })
            item.save()
            .then((item) => {
                User.findOne({_id:req.user._id})
                .then((user) => {
                    if(user.onSale.indexOf(item._id) == -1) {
                        user.onSale.push(item._id);
                        user.save();
                    }
                }/*,err => next(err)*/)
                // .catch(next(err));
                // console.log(res.statusCode);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(item);
                res.end();
            }/*, (err => next(err)))
            .catch((err) => next(err)*/);
        }
    });
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;