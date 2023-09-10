const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;
const dbConnection = require('./config/db');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const {notFound , errorHandler} = require('./middleware/errorHandler')
dbConnection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/user' , authRouter);
// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT , ()=>{
 console.log(`the server runing on ${PORT}`)
});
