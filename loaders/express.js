const express = require('express');


const expressLoader = async (app) => {

    app.get('/status', (req, res) => {
        res.status(200).json({ error: false, message: 'Healthy server!' });
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    app.use(express.json())//parse the incoming json data

  // ...More middlewares

  // Return the express app
    return app
}



module.exports = expressLoader;