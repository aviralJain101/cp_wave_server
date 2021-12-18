const express = require('express')
const UserAuth = require('../models/userAuth')

const router = new express.Router()

//signin user
router.post('/users/signin',async(req,res)=>{
    try{
        const user = await UserAuth.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token:token})
    }catch(error){
        res.status(400).send(error)
    }
})

//signup user
router.post('/users/signup',async(req,res)=>{
    const user = new UserAuth(req.body)

    try{
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({user,token});
    }catch(error){
        res.status(400).send(error)
    }
})



module.exports = router