const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
var User = require('../models/user');
const Commodity = require('../models/commodity');
const Course = require('../models/course');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        var position = file.originalname.lastIndexOf('.')
        var fileName = file.originalname.slice(0,position)
        var extension = file.originalname.slice(position)
        cb(null, fileName+'-' + Date.now()+extension)
    }
});
var upload = multer({ storage : storage}).single('courseImage');  



const sellRouter = express.Router();
sellRouter.use(bodyParser.json());



sellRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    User.findById(req.user._id)
    .populate('createdCourses')
    .then((course) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(course.createdCourses);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    console.log("requested");
    upload(req,res,function(err) {  
        if(err) { 
            // err = new Error('error upoading file');
            // err.status = 500;
            res.statusCode=500;
            res.end({errMess:"error while uploading"});
            // return next(err);
        }
        else {
            console.log(req.file)

            var course = new Course({
                author: req.user._id,
                title: req.body.title,
                price: req.body.price,
                category: req.body.category,
                image: 'images/'+req.file.filename,
                description: req.body.description
            })
            course.save()
            .then((course) => {
                User.findOne({_id:req.user._id})
                .then((user) => {
                    if(user.createdCourses.indexOf(course._id) == -1) {
                        user.createdCourses.push(course._id);
                        user.save();
                    }
                }/*,err => next(err)*/)
                // .catch(next(err));
                // console.log(res.statusCode);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(course);
                res.end();
            }/*, (err => next(err)))
            .catch((err) => next(err)*/);
        }
    });
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /sell');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /sell');
});

module.exports = sellRouter;