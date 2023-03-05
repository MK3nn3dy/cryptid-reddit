const express = require('express');

const authRouter = express.Router();

const { loginUser, signupUser, updateTheme, getUserById, addToIcons, removeFromIcons} = require('../controllers/authController');

authRouter.get('/:id', getUserById);

authRouter.post('/signup', signupUser);

authRouter.post('/login', loginUser);

authRouter.patch('/changetheme', updateTheme);

authRouter.patch('/addicon', addToIcons);

authRouter.patch('/removeicon', removeFromIcons);

module.exports = authRouter