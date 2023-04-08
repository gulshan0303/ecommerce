const express = require('express');
const { createOrder, getOrder,getAllOrders, updateOrder } = require('../controller/order');
const { register,loginController, getAll, getUserById, updateUser, deleteUser, blockUser, unblockUser, handleToken, logOut, updatePassword, forgotPassword, resetPassword, adminController, getWishList, saveAddress, addToCart, getCart, removeCart, applyCoupon} = require('../controller/userConreoller');
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');


const router = express.Router();
router.post("/register",register)
 router.post("/login",loginController)
 router.post("/admin-login",adminController)
 router.post("/forgot-password",forgotPassword)
 router.post("/cart",authMiddleware,addToCart)
 router.post("/cart/coupon",authMiddleware,applyCoupon)
 router.post("/cart/create-order",authMiddleware,createOrder)
 router.put("/reset-password/:token",resetPassword)
 router.get("/all",getAll)
 router.get("/refresh",handleToken)
 router.get("/logout",logOut)
 router.get("/wishlist",authMiddleware, getWishList)

 router.get("/order/all",authMiddleware,isAdmin, getAllOrders)
 router.get("/order/:id",authMiddleware,isAdmin, getOrder)
 router.get("/cart",authMiddleware, getCart)
 router.get("/:id",authMiddleware,isAdmin, getUserById)
 router.put("/order/update/:id",authMiddleware,isAdmin,updateOrder)
 router.put("/changepassword",authMiddleware,updatePassword)
 router.put("/save-address",authMiddleware,saveAddress)
 router.put("/:id",authMiddleware,updateUser)
 router.delete("/cart-remove",authMiddleware,removeCart)
 router.delete("/:id",deleteUser)
 router.put("/block/:id",authMiddleware,isAdmin,blockUser)
 router.put("/unblock/:id",authMiddleware,isAdmin,unblockUser)


module.exports = router