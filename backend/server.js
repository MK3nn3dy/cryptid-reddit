// imports
const express = require('express');
const authRouter = require('./routes/authRouter');

// configure environment variables
require('dotenv').config();

// create app
const app = express();

// middleware
app.use(express.json());

// routers
app.use('backend/auth', authRouter);

// listen on port
app.listen(process.env.PORT, () => {
    console.log(`Cryptid backend now listening on ${process.env.PORT}`);
})