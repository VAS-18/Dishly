import express from 'express';

import { register } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

export default router;

