const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const dbConnection = require('./config/dbConnection');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const app = express();

//routes api
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/product');
const {errorHandler,notFound} = require('./middleware/errorHandler');
const port = process.env.PORT || 5050

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//api routes

app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/product",productRoutes)

//middleware

// app.use(errorHandler)


app.use(notFound);
app.use(errorHandler);

app.listen(port,() =>{
    dbConnection();
    console.log(`server is running at  ${port}`)
})
