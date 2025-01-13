import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose';
import morgan from 'morgan'
import connectDB from './config/db.js'

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//test route
app.get('/api/test',(req,res) => {
    res.json({message: "Welcome to Dishly"});
});


//error handling middleware
app.use((err,req,res,next) => {
    const statuscode = err.statuscode;
    const errMessage = err.message;
    res.status(statuscode).json({
        status: 'error',
        statuscode,
        message: errMessage
    })
})


//handling 404
app.use((req,res)=>{
    res.status(400).json({
        status: 'error',
        message: 'Route not found'
    })
})




//server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});