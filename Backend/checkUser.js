import mongoose from 'mongoose';
import User from './models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const checkUser = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });
        
        if (user) {
            console.log('User found:', user);
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

const token = 'YOUR_TOKEN_HERE'; // Replace with the actual token
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => checkUser(token))
    .catch(err => console.error('Database connection error:', err));
