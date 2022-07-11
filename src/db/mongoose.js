const mongoose = require('mongoose')

const URI = process.env.DATABASE;

const connectDB = () => {
  mongoose.connect(URI);
  console.log('Database Connected');
}

module.exports = connectDB;