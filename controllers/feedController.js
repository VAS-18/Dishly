import Recipe from '../models/Recipe.js';
import {StatusCodes} from 'http-status-codes';

export const getFeed = async (req, res) => {
    try {
        
        const recipes = await Recipe.find().populate('user', 'username').sort({createdAt: -1}).limit(20);

        res.status(StatusCodes.OK).json({
            success: true,
            count: recipes.length,
            recipes
        });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error fetching feed',
            error: error.message
        });
    }
};