require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 4000;
// Requiring Database connection
require('./config/db.config')


//Requiring Routers
const userRouter = require('./api/userRouter')
const authRouter = require('./api/authRouter')
const companyRouter = require('./api/companyRouter')
const ratingRouter = require('./api/ratingRouter')


//Configuring middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Router Handling middlewares
app.get('/', (req, res) => {
    res.send("Server is running")
})
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/company', companyRouter)
app.use('/api/rating', ratingRouter)



app.listen(port, () => console.log(`Server Starts on port ${port}`));