const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
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
.get(cors.cors, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(cors.corsWithOptions,(req, res, next) => {
    upload(req,res,function(err) {  
        if(err) { 
            console.log(err); 
            return res.end("Error uploading file.");  
        }
        var item = new Commodity({
            seller: 1,
            itemname: req.body.itemname,
            price: req.body.price,
            category: req.body.category,
            image: req.file.originalname
        })
        item.save()
        .then((item) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(req.file);
        }, (err => next(err)))
        .catch((err) => next(err));
        
    });  
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.json(req.file);
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