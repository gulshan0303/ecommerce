
const notFound = (req,res,next) =>{
    const error = new Error(`not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err,req,res,next) => {
     const statuscode = res.statusCode ===200 ? 500 : res.statusCode;
     res.status(statuscode).json({message: err?.message,
    stack:err?.stack});
}

module.exports = {notFound, errorHandler}


// const errorResponse = require('../utils/errorResponse');


// const errorHandler = (err,req,res,next) => {
//     let error = {...err};
//     error.message = err.message

//     //message cast error

//     if(err.name==="castError"){
//         const message = "Resource not found";
//         error = new errorResponse(message,404);
//     }

//   //duplicate key error
//   if(err.code === 11000){
//     const message = "Duplicate value entered"
//     error = new errorResponse(message,400);
//   }
//   //mongoose validation
//   if(err.name === 'ValidationError'){
//     const message = Object.values(err.errors).map(val => val.message)
//     error = new errorResponse(message,400);
//     res.status(err.statusCode || 500).json({
//         success:false, error: error.message || 'server error'
//       })
//   }
// }

// module.exports = errorHandler;