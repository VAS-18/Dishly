import bcrypt from 'bcrypt';
import User from '../models/User';
import { registerSchema } from '../utils/validation.js';

export const register  = async(req, res) => {
    try {
        const validateBody = registerSchema.parse(req.body);
        const ExistingUser = await User.findOne({ email: validateBody.email });
        if (ExistingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(validateBody.password, 10);

        const user = new User({
            username: validateBody.username,
            email: validateBody.email,
            password: hashedPassword
        });

        await user.save();

    } catch (error) {
        res.status(400).json({error: error.error || error.message})
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
}