import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authMiddleware = async(req,res,next) =>{
    try {
        const authorization = req.header('Authorization');
        if(!authorization){
            return res.status(401).json({
                error: 'No Auth Header, authorization denied'
            });
        }

        const token = authorization.replace('Bearer ', '');
        if(!token){
            return res.status(401).json({
                error: 'No Token Provided, authorization denied'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                error: 'Token verification failed, authorization denied'
            });
        }
        const user = await User.findOne({ _id: decoded.userId, 'tokens.token': token });
        
        if(!user){
            return res.status(401).json({
                error: 'User Not Found, authorization denied'
            });
        }
        req.user = user;
        req.token = token;
        next();
        
    } catch (error) {
        res.status(401).json({
            error: 'Invalid Token, authorization denied...'
        })
    }
}