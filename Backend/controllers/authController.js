import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { registerSchema } from '../utils/validation.js';
import jwt from 'jsonwebtoken';

export const register  = async(req, res) => {
    try {
        const validateBody = registerSchema.parse(req.body);
        const ExistingUser = await User.findOne({ $or: [{ email: validateBody.email }, { username: validateBody.username }] });
        if (ExistingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const user = await new User({
            username: validateBody.username,
            email: validateBody.email,
            password: validateBody.password,
        });
        user.save();
        res.status(201).json({"message": "User created successfully"});

    } catch (error) {
        res.status(400).json({error: error.error || error.message})
    }

}

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                error: 'Invalid email or password'
            })
        }

        const token = jwt.sign({ userId : User._id}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({
            message: 'Login Successful',
            token
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

}

