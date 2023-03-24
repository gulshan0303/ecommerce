const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const validateUserId = require('../utils/validateId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken')

const register = asyncHandler( async(req,res)=>{
     
           const {email} = req.body;
           const findUser = await User.findOne({email});
           if(!findUser){
               const newUser = await User.create(req.body);
               res.status(201).json({success:true,message:"User created successfully",user:newUser});
           }else{
               throw new Error("User Already existing");
           }
    
})

const loginController = asyncHandler(async(req,res) =>{
    const {email,password} = req.body;
    //find existing user
    const findUser = await User.findOne({email});

    if(findUser && await findUser.isPasswordMatch(password)){
        const user ={
            id: findUser?._id,
            firstName:findUser?.firstName,
            lastName:findUser?.lastName,
            email:findUser?.email,
            mobile:findUser?.mobile,
        }
        const refreshToken = generateRefreshToken(findUser._id);
        const updateUser  = await User.findByIdAndUpdate(findUser._id,{refreshToken:refreshToken},{new:true});

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge:72*60*60*1000
        })
        res.status(200).json({success:true,findUser:user,token:generateToken(findUser?._id)});
    }else{
        throw new Error("Invalid credentials!!");
    }
})

//handleToken
const handleToken = asyncHandler(async(req,res) => {
   const cookie = req.cookies;
   if(!cookie.refreshToken) throw new Error("No refresh token in cookies");
   const refreshToken = cookie.refreshToken;
   const user = await User.findOne({refreshToken})
   if(!user) throw new Error("No refresh token in db");
   jwt.verify(refreshToken,process.env.JWT_ACCESS_SECRET,(err,decoded) =>{
      if(err || user.id !==decoded.id ) throw new Error("There is something wrong ")
      const accessToken = generateRefreshToken(user._id)
      res.status(200).json({success:true,accessToken});
   })
})
//logout
const logOut = asyncHandler(async(req,res) => {
    const cookie = req.cookies;
    if(!cookie.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken})

    if(!user){
        res.clearCookie('refreshToken',{
            httpOnly:true,
            secure:true
        });
        return res.sendStatus(204);
    }
    await User.findByIdAndUpdate(user._id,{
        refreshToken:""
    });
    res.clearCookie('refreshToken',{
        httpOnly:true,
        secure:true
    });
    return res.sendStatus(204);
});

//get all user
const getAll = asyncHandler(async(req,res) => {
    try {
        const getAllUser = await User.find();
         res.status(200).json({success:true, getAllUser})
    } catch (error) {
         throw new Error(error)
    }
})

// get by id
const getUserById = asyncHandler(async(req,res) => {
    const {id} = req.params;
    validateUserId(id)
    try {
         const user = await User.findById(id);
         if(!user){
            throw new Error("Invalid user id");
         }
         res.status(200).json({success:true,user})
    } catch (error) {
        throw new Error(error)
    }
})

//update user
const updateUser = asyncHandler(async(req,res) => {
   const {_id} = req.user;
    validateUserId(_id)
   try {
      const updatedUser = await User.findByIdAndUpdate(_id,{...req.body},{new:true});
      res.status(201).json({success:true,updatedUser});
   } catch (error) {
    throw new Error(error)
   }
})

//delete user
const deleteUser = asyncHandler(async(req,res) => {
    const {id} = req.params;
    validateUserId(id)
    try {
       const updatedUser = await User.findByIdAndDelete(id);
       res.status(201).json({success:true,message:"User has been deleted!!"});
    } catch (error) {
     throw new Error(error)
    }
 })

 //block a user
 const blockUser = asyncHandler(async(req,res) => {
   const {id} = req.params;
   validateUserId(id)
   try {
      const blockUser = await User.findByIdAndUpdate(id,{isBlocked:true},{new:true});
      res.status(200).json({success:true,message:"User has been Blocked!!"})
   } catch (error) {
     throw new Error(error)
   }
 })

 //unblock user
 const unblockUser = asyncHandler(async(req,res) => {
    const {id} = req.params;
    validateUserId(id)
    try {
       const unblockUser = await User.findByIdAndUpdate(id,{isBlocked:false},{new:true});
       res.status(200).json({success:true,message:"User has been Unblocked!!"})
    } catch (error) {
      throw new Error(error)
    }
  })



module.exports ={register,loginController,getAll,getUserById,updateUser,deleteUser,unblockUser,blockUser,handleToken,logOut}