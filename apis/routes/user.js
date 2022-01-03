const  express = require('express');
const User = require('../../models/user');
const auth = require('../middlewares/auth');

const router = new express.Router()

router.post('/user/details', auth, async(req, res) => {
    try{
        const user = new User({
            _id: req.userId,
            name: req.body.name,
        });
        await user.save();
        res.status(201).send(user);
    }catch(error){
        res.status(400).send(error.message);
    }
})

router.get('/user/details', auth, async(req, res) => {
    try{
        const _id = req.userId;
        //TASK : Use populate to fill the problem and courses fields.
        const user = await User.findById(_id);
        if(user) res.status(201).send(user);
        else res.status('404').send('User Not found');
    }catch(error){
        res.status(400).send(error);
    }
})

//when user buys a new course
//NOT TESTED
router.post('/user/details/course/buy/:courseId', auth, async(req, res) => {
    try{
        const _courseId = req.params.courseId;
        const _id = req.userId;
        const user = await User.findById(_id);
        user.boughtCourses.push(_courseId);
        await user.save();
        res.status(201).send('Succesfully Bought')
    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = router