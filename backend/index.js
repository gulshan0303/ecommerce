const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const dbConnection = require('./config/dbConnection');

const app = express();

const port = process.env.PORT || 5050

//middleware
app.use(cors());
app.use(express.json());

//api routes
// app.use("/api/v1/auth",)

app.listen(port,() =>{
    dbConnection();
    console.log(`server is running at  ${port}`)
})
