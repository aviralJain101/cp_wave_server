const loaders = require('./loaders');
const express = require('express');

async function startServer() {

  const app = express();

  await loaders(app);
  const port = process.env.PORT;
  app.listen(port, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready at ${port}`);
  });
}

startServer();