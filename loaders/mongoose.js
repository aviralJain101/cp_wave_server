const mongoose = require('mongoose')

const loadDb = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URL || null,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology: true,
        useFindAndModify:false //to remove deoprecation warning while using find and modify
    })
  return connection.connection.db;
}

module.exports = loadDb;