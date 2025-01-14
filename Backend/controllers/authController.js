
import User from '../models/userModel.js';
import { registerSchema } from '../utils/validation.js';

const generateRefreshAndAccessToken = async (userId) => {
    try {
        const user = await User.findByIdAndUpdate(userId);
       const refreshToken = user.generateRefreshToken();
       const accessToken = user.generateAccessToken();

         user.refreshToken = refreshToken;

        await user.save( { validateBeforeSave: false } );

        return { refreshToken, accessToken };

    } catch (error) {
        res.status(500).json({
            error: "Error generating tokens"
    });
}
}


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
        const { username, email, password } = req.body;
        if(!username || !email){
            return res.status(400).json({
                error: 'Username or email is required'
            });
        }

        const user = await User.findOne({ $or: [{ email }, { username }] });


        if (!user) {
            return res.status(400).json({
                error: 'User does not Exist'
            });
        }

        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid){
            return res.status(401).json({
                error: 'Invalid email or password'
            })
        }

       const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id);

        res.json({
            message: 'Login Successful',
            accessToken,
            refreshToken
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

}
