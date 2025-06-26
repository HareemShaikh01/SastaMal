const mongoose = require('mongoose');
const { secret } = require('./secret');

mongoose.set('strictQuery', false);

// local url 
const MONGO_URI = secret.db_url || "mongodb+srv://Arapp:4NXUcv37A1NyJ7Y9@cluster0.iymtagb.mongodb.net/ecommerce-shofy?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try { 
    await mongoose.connect(MONGO_URI);
    console.log('mongodb connection success!');
  } catch (err) {
    console.log('mongodb connection failed!', err.message);
  }
};

module.exports = connectDB;
