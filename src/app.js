require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 4000;

// Requiring Database connection
require('./config/db.config')


//Requiring Routers
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const companyRouter = require('./routes/companyRouter')
const ratingRouter = require('./routes/ratingRouter')


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