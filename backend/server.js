const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const productRoute = require('./routes/api/productRoute');

// Connecting to the Database
let mongodb_url = 'mongodb://mongodb:27017/';
let dbName = 'yolomy';
// const DB_USER = 'root';
// const DB_PASSWORD = '123';
// const DB_PORT = '27017';
// const DB_NAME = 'yolomy';
// const DB_HOST = 'mongodb';

// const mongodb_url = `${DB_USER}:${DB_PASSWORD}@mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;


// define a url to connect to the database
const MONGODB_URI = process.env.MONGODB_URI || mongodb_url + dbName
mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true  } )
let db = mongoose.connection;

// Check Connection
db.once('open', ()=>{
    console.log('Database connected successfully')
})

// Check for DB Errors
db.on('error', (error)=>{
    console.log(error);
})

// Initializing express
const app = express()

// Body parser middleware
app.use(express.json())

// 
app.use(upload.array()); 

// Cors 
app.use(cors());

// Use Route
app.use('/api/products', productRoute)

// Define the PORT
const PORT = process.env.PORT || 5001

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})
