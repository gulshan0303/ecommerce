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
const blogRoutes = require("./routes/blog");
const categoryRoutes = require("./routes/category");
const colorRoutes = require("./routes/color");
const blogCategoryRoutes = require("./routes/blogCategory");
const brandRoutes = require("./routes/brand");
const couponRoutes = require("./routes/coupon");
const uploadRoutes = require("./routes/upload");
const enquiryRoutes = require("./routes/enquiry");
// const orderRoutes = require("./routes/order");
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
app.use("/api/v1/blog",blogRoutes)
app.use("/api/v1/blogcategory",blogCategoryRoutes);
app.use("/api/v1/brand",brandRoutes);
app.use("/api/v1/coupon",couponRoutes);
app.use("/api/v1/color",colorRoutes);
app.use("/api/v1/upload",uploadRoutes);
app.use("/api/v1/enquiry",enquiryRoutes);
app.use("/api/v1/category",categoryRoutes);
// app.use("/api/v1/order",orderRoutes);

//middleware

// app.use(errorHandler)


app.use(notFound);
app.use(errorHandler);

app.listen(port,() =>{
    dbConnection();
    console.log(`server is running at  ${port}`)
})
