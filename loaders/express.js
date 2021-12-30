const express = require('express');
const userAuthRoute = require('../apis/routes/auth');
const userRoute = require('../apis/routes/user');

const expressLoader = async (app) => {

    app.get('/status', (req, res) => {
        res.status(200).json({ error: false, message: 'Healthy server!' });
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    app.use(express.json())//parse the incoming json data
    
    //include routes here
    app.use(userAuthRoute);
    app.user(userRoute);
  
    // ...More middlewares

    // Return the express app
  
    return app
}



module.exports = expressLoader;