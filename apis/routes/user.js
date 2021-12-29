const  express = require('express');
const User = require('../../models/user');
const auth = require('../middlewares/auth');

const router = new express.Router()


router.get('/user/course/bought', auth, async(req, res) => {
    try{
        const _userId = req.user.id;
        const user = await getUserByUserId()
    }catch(error){
        res.status(400).send(error);
    }
})

module.exports = router