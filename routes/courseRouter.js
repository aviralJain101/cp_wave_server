const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../authenticate');

const courseRouter = express.Router();

courseRouter.use(bodyParser.json());
const Users = require('../models/user');

// courseRouter.route('/')
// .options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
// .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
//     var fieldName = ((type.equals('created'))?"createdCourse":"boughtCourse");

//     Users.find({_id:req.user.id},{fieldName:1,_id:0})
//     .populate(fieldName)
//     .then((courses) => {
//         if(courses.length == 0 || courses == null) {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(courses);
//         }
//         else {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(courses);
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })

// .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     if (req.body != null) {
//         console.log(req.user._id);
//         console.log(req.body);
//         var course = new Courses({
//             author: req.user._id,
//             courseName: req.body.courseName,
//             price: req.body.price,
//             tags: req.body.tags,
//             rating:  [],
//             buyers: [],
//             comments:[]
//         })
//         course.save()
//         .then((course) => {

//             Users.findOne({username: req.user._id})
//             .then((user) => {
//                 user.createdCourse.push(course._id);
//                 user.save();
//             }, (err => next(err)))
//             .catch((err) => next(err));

//             Courses.findById(course._id)
//             .populate('author')
//             .then((course) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(course);
//             });
//         }, (err => next(err)))
//         .catch((err) => next(err));      
//     }
//     else {
//         err = new Error('Courses not found in request body');
//         err.status = 404;
//         return next(err);
//     }

// })
// .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /courses');
// })
// .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     res.statusCode = 403;
//     res.end('DELETE operation not supported on /courses');

// });



// courseRouter.route('/:courseId')
// .options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
// .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
//     Courses.find({"_id":req.params.courseId})
//     .populate({
//         path:'author'
//     })
//     .then((course) => {
//         if(courses.length == 0 || courses == null) {
//             err = new Error(`Course with id ${req.params.courseId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//         else {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(course);
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })

// // .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
// //     if (req.body != null) {
// //         console.log(req.user._id);
// //         Users.findById(req.user._id).
// //         then((user) => {
// //             if(user != null)
// //             {
// //                 console.log(req.body);
// //                 var course = new Courses({
// //                     author: user._id,
// //                     courseName: req.body.courseName,
// //                     price: req.body.price,
// //                     tags: req.body.tags,
// //                     rating:  [],
// //                     buyers: [],
// //                     comments:[]
// //                 })
// //                 course.save()
// //                 .then((course) => {
// //                 Courses.findById(course._id)
// //                     .populate('author')
// //                     .then((course) => {
// //                     res.statusCode = 200;
// //                     res.setHeader('Content-Type', 'application/json');
// //                     res.json(course);
// //                     });
// //                 }, (err => next(err)))
// //                 .catch((err) => next(err));
// //             }
// //             else {
// //                 err = new Error('You have to Register Yourself before creating any courses');
// //                 err.status = 404;
// //                 return next(err);
// //             }

// //         }, (err) => next(err))
// //         .catch((err) => next(err));        
// //     }
// //     else {
// //         err = new Error('Courses not found in request body');
// //         err.status = 404;
// //         return next(err);
// //     }
// // })
// .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /courses:courseId');
// })
// .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /courses:courseId');
// });


// courseRouter.route('/:courseId/check')
// .options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
// .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
//     Users.find({_id:req.user.id})
//     .then((user) => {
//         if(user.createdCourse!= null) {
//             if(user.createdCourse.indexOf(req.params.courseId) >= 0) {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({creator: true, bought:false});
//             }
//             else if(user.boughtCourse.indexOf(req.params.courseId) >= 0) {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({creator: false, bought:true});
//             }
//             else {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({creator: false, bought:false});
//             }
//         }
//         else if(user.boughtCourse!= null) {
//             if(user.boughtCourse.indexOf(req.params.courseId) >= 0) {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({creator: false, bought:true});
//             }
//             else {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({creator: false, bought:false});
//             }
//         }
//         else {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json({creator: false, bought:false});
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })


// courseRouter.route('/:courseId/buycourse')
// .options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
// .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     Users.findById(req.user._id)
//     .then((user) => {
//         user.push(courseId);
//         user.save();

//         Courses.findById(courseId)
//         .then((course) => {
//             course.buyers.push(req.user._id)
//         })
//     })

//     Courses.findById(courseId)
//     .then((course) => {
//         course.buyers.push(req.user._id)
//         course.save();

//         Users.findById(req.user._id)
//         .then((user) => {
//             user.push(courseId);
//             user.save();
//         },(err => next(err)))
//         .catch((err) => next(err));
//     }, (err => next(err)))
//     .catch((err) => next(err));
// })

// module.exports = courseRouter;