const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require("../model/userModel");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
        return next();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Token expired or invalid");
    }
  } else {
    res.status(401);
    throw new Error("No token provided");
  }
});

const isAdmin = asyncHandler(async(req,res,next) => {
   const {email} = req.user;
  try {
    const isAdmin = await User.findOne({email});
    if(isAdmin.role !=="admin"){
        throw new Error("You are not admin");
    } else{
        next();
    }
  } catch (error) {
    throw new Error(error);
  }
})

module.exports = { authMiddleware,isAdmin };
