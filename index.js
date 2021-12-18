const loaders = require('./loaders');
const express = require('express');

async function startServer() {

  const app = express();

  await loaders(app);

  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

startServer();