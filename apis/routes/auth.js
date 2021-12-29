const express = require('express')
const jwt = require('jsonwebtoken')
const UserAuth = require('../../models/userAuth')

const router = new express.Router()

//signin user
router.post('/user/signin',async(req,res)=>{
    try{
        const user = await UserAuth.findByCredentials(req.body.email, req.body.password)
        const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET);
        res.send({user, token:token})
    }catch(error){
        res.status(404).send(error)
    }
})

//signup user
router.post('/user/signup',async(req,res)=>{
    const user = new UserAuth(req.body)

    try{
        const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET);
        await user.save();
        res.status(201).send({user,token});
    }catch(error){
        res.status(400).send(error)
    }
})



module.exports = router