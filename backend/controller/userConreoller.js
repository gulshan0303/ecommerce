const User = require("../model/userModel");
const Cart = require("../model/cart");
const Product = require("../model/product");
const Coupon = require("../model/coupon");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateUserId = require("../utils/validateId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");

const crypto = require("crypto");

const register = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        user: newUser,
      });
  } else {
    throw new Error("User Already existing");
  }
});

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find existing user
  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatch(password))) {
 
    const refreshToken = generateRefreshToken(findUser._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser._id,
      { refreshToken: refreshToken },
      { new: true }
    );

    const user = {
      id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token:refreshToken
    };

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({
        success: true,
        findUser: user,
        // token: generateToken(findUser?._id),
      });
  } else {
    throw new Error("Invalid credentials!!");
  }
});

//admin login
const adminController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find existing user
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("You are not authorized!!");
  if (findAdmin && (await findAdmin.isPasswordMatch(password))) {
    const user = {
      id: findAdmin?._id,
      firstName: findAdmin?.firstName,
      lastName: findAdmin?.lastName,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
    };
    const refreshToken = generateRefreshToken(findAdmin._id);
    const updateUser = await User.findByIdAndUpdate(
      findAdmin._id,
      { refreshToken: refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({
        success: true,
        findAdmin: user,
        token: generateToken(findAdmin?._id),
      });
  } else {
    throw new Error("Invalid credentials!!");
  }
});

//handleToken
const handleToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) throw new Error("No refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token in db");
  jwt.verify(refreshToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id)
      throw new Error("There is something wrong ");
    const accessToken = generateRefreshToken(user._id);
    res.status(200).json({ success: true, accessToken });
  });
});
//logout
const logOut = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) throw new Error("No refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findByIdAndUpdate(user._id, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204);
});

//get all user
const getAll = asyncHandler(async (req, res) => {
  try {
    const getAllUser = await User.find();
    res.status(200).json({ success: true, getAllUser });
  } catch (error) {
    throw new Error(error);
  }
});

// get by id
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateUserId(id);
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Invalid user id");
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    throw new Error(error);
  }
});

//update user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateUserId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { ...req.body },
      { new: true }
    );
    res.status(201).json({ success: true, updatedUser });
  } catch (error) {
    throw new Error(error);
  }
});

//save user Address
const saveAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateUserId(_id);
    try {
      const saveAddress = await User.findByIdAndUpdate(
        _id,
        {address:req.body.address},
        { new: true }
      );
      res.status(200).json({ success: true, saveAddress });
    } catch (error) {
      throw new Error(error);
    }
  });

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateUserId(id);
  try {
    const updatedUser = await User.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: "User has been deleted!!" });
  } catch (error) {
    throw new Error(error);
  }
});

//block a user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateUserId(id);
  try {
    const blockUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.status(200).json({ success: true, message: "User has been Blocked!!" });
  } catch (error) {
    throw new Error(error);
  }
});

//unblock user
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateUserId(id);
  try {
    const unblockUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "User has been Unblocked!!" });
  } catch (error) {
    throw new Error(error);
  }
});

//update password

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateUserId(_id);
  console.log("req.body", req.body);
  //find user by id
  const user = await User.findById(_id);
  console.log("user", user);
  if (password) {
    user.password = password;
    const updatePassword = await user.save();
    console.log("updatePassword", updatePassword);
    res.json({ success: true, message: "update password", updatePassword });
  } else {
    // res.json(user);
  }
});

// forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User is not found with this email");
  try {
    const token = await user.createPasswordResetToken();

    await user.save();
    const resetUrl = `Hi please follow this link for update Password. <a href="http://localhost:8484/api/v1/auth/reset-password/${token}>Click here</>`;

    const data = {
      to: email,
      text: "Hey User!!",
      subject: "Forgot password!!",
      html: resetUrl,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

//reset password

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token Expired!!, please try again");

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;

  await user.save();
  res.json({ message: "your password Changed successfully!!", user });
});

//get wishlist
const getWishList = asyncHandler(async(req,res) => {
    const {_id} = req.user;
  
    try {
        const getwishlist = await User.findById(_id).populate('wishList');
         res.json(getwishlist);
    } catch (error) {
        throw new Error(error) 
    }
})

//add to cart
const addToCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateUserId(_id);
  const { productId,price,quantity,color } = req.body;
  try {
   
    const newCart = await new Cart({
      userId:_id,
      productId,
      price,
      quantity,
      color
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

//get cart
const getCart = asyncHandler(async(req,res) => {
  const {_id} = req.user;
  validateUserId(_id)
  try {
      const cart = await Cart.find({userId:_id}).populate('productId').populate("color");
      // console.log('cart', cart)
       res.json(cart);
  } catch (error) {
      throw new Error(error) 
  }
})

//empty cart
const removeCart = asyncHandler(async(req,res) => {
  const {_id} = req.user;
  validateUserId(_id)
  try {
     const user = await User.findById(_id);
      const cart = await Cart.findOneAndRemove({orderBy:user?._id});
       res.json({message:"Card successfully remove!!"});
  } catch (error) {
      throw new Error(error) 
  }
})

// apply coupon
const applyCoupon = asyncHandler(async(req,res) => {
  const {_id} = req.user;
  const {coupon} = req.body;
  validateUserId(_id)
  try {
      const validCoupon = await Coupon.findOne({name:coupon})
      if(validCoupon === null) throw new Error("Invalid Coupon");

      const user = await User.findById(_id);
      let {cartTotal} = await Cart.findOne({orderBy:user?._id}).populate("products.product");
      let totalAfterDiscount = (cartTotal - (cartTotal*validCoupon.discount)/100).toFixed(2); 
      await Cart.findOneAndUpdate({orderBy:user?._id},{totalAfterDiscount},{new:true})
      res.json({totalAfterDiscount});
  } catch (error) {
      throw new Error(error) 
  }
})



module.exports = {
  register,
  loginController,
  getAll,
  getUserById,
  updateUser,
  deleteUser,
  unblockUser,
  blockUser,
  handleToken,
  logOut,
  updatePassword,
  resetPassword,
  forgotPassword,
  adminController,
  getWishList,
  saveAddress,
  addToCart,
  getCart,
  removeCart,
  applyCoupon
};
