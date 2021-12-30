const  express = require('express');
const User = require('../../models/user');
const auth = require('../middlewares/auth');

const router = new express.Router()

router.post('/user/details', auth, async(req, res) => {
    try{
        const user = await new User({
            userId: req.userId,
            name: req.body.name,
        });
        res.status(201).send(user);
    }catch(error){
        res.status(400).send(error);
    }
})

router.get('/user/details', auth, async(req, res) => {
    try{
        const user = await User.findOne({userId: req.userId});
        if(user) res.status(201).send(user);
        else res.status('404').send('User Not found');
    }catch(error){
        res.status(400).send(error);
    }
})

module.exports = router