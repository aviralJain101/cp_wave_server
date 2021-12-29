const mongoose = require('mongoose')

const loadDb = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/cp-wave-api",{
        useNewUrlParser:true,
        //useCreateIndex:true,
        useUnifiedTopology: true,
        //useFindAndModify:false //to remove deoprecation warning while using find and modify
    })
  return connection.connection.db;
}

module.exports = loadDb;