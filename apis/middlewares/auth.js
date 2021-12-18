const jwt = require('jsonwebtoken')
const UserAuth = require('../models/userAuth')

const auth = async(req, res, next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserAuth.findById(decoded._id);
        // const user = await UserAuth.findOne({_id: decoded._id});
        if(!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send('authenticate first')
    }
}

module.exports = auth